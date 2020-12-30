// @flow
import swal from "sweetalert";
import axios from "axios";
import { loadStorage, URL } from "../../../config";

const setKey = (
  keywordList: Array<string>,
  setKeywordList: Function,
  { keyCode, target }: any
) => {
  if (keyCode === 32 || keyCode === 188 || keyCode === 190) {
    const key = target.value.replaceAll(",", "").replaceAll(".", "");
    var list = keywordList.map((key) => key.trim());
    list.includes(target.value)
      ? swal("You can't add the same keyword")
      : key !== "" && key !== " "
      ? list.push(key)
      : swal("Add a valid word");
    setKeywordList(list);
    target.value = "";
  }
};

const deleteKey = (
  keywordList: Array<string>,
  setKeywordList: Function,
  { target }: any
) => {
  var list = keywordList.map((key) => key.trim());
  var index = list.indexOf(target.innerText.toLowerCase());
  if (index > -1) {
    list.splice(index, 1);
    setKeywordList(list);
  }
};

const deletePost = (user: string, id: string, setLoad: Function) => {
  swal({
    title: "Are you sure wanna delete this post?",
    text: "The comments will be deleted too",
    icon: "warning",
    dangerMode: true,
    buttons: {
      cancel: {
        text: "Cancel",
        visible: true,
      },
      ok: {
        visible: true,
        text: "Yes, delete post",
      },
    },
  }).then((willDelete: boolean) => {
    if (willDelete) {
      setLoad(true);
      setTimeout(() => {
        axios({
          method: "delete",
          url: `${URL}/users/${user}/posts/${id}`,
          headers: {
            Authorization: `Bearer ${loadStorage("TOKEN")}`,
          },
        })
          .then(() => {
            swal("Post deleted").then(() => {
              setLoad(false);
              window.location.href = "/";
            });
          })
          .catch((error: any) => {
            if (error.response.status === 404) {
              swal(
                "You can't delete the post because is missing or not exist anymore"
              ).then(() => {
                setLoad(false);
                window.location.reload();
              });
            } else {
              swal(
                "You can't delete the post because you don't have permission to do it"
              ).then(() => {
                setLoad(false);
                window.location.reload();
              });
            }
          });
      }, 500);
    } else return;
  });
};

const submitForm = async (
  values: any,
  keywordList: Array<string>,
  setEmpty: Function,
  setLoad: Function
) => {
  if (keywordList.length <= 0) {
    setEmpty(true);
    return;
  } else {
    setEmpty(false);
    setLoad(true);
    axios({
      method: "post",
      url: `${URL}/users/${loadStorage("USER")}/posts/`,
      headers: {
        Authorization: `Bearer ${loadStorage("TOKEN")}`,
      },
      data: {
        title: values.title,
        content: values.content,
        user: loadStorage("USER"),
        summary: values.summary,
        keywords: keywordList,
        isSaved: 0,
      },
    })
      .then((response: any) => {
        if (response.status) {
          console.log("Post created");
        }
        setTimeout(() => {
          swal("Post created").then(() => {
            setLoad(false);
            window.location.href = `/users/${loadStorage("USER")}`;
          });
        }, 500);
      })
      .catch((error: any) => {
        if (error.response.status === 401 || error.response.status === 403) {
          swal("You don't have the permission to create the post").then(() => {
            setLoad(false);
            window.location.href = "/";
          });
        } else {
          swal("You can't do it now, try again later").then(() => {
            setLoad(false);
          });
        }
      });
  }
};

export { setKey, deleteKey, deletePost, submitForm };
