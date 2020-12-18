// @flow
import swal from "sweetalert";
import axios from "axios";
import cookie from "react-cookies";
const setKey = (
  keywordList: Array<string>,
  setKeywordList: Function,
  { keyCode, target }: any
) => {
  if (keyCode === 13 || keyCode === 32 || keyCode === 188 || keyCode === 190) {
    var list = keywordList.map((key) => key.trim());
    list.includes(target.value)
      ? swal("You can't add the same keyword")
      : list.push(target.value.replaceAll(",", "").replaceAll(".", ""));
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
  }).then((willDelete) => {
    if (willDelete) {
      setLoad(true);
      setTimeout(() => {
        axios({
          method: "delete",
          url: `${URL}/users/${user}/posts/${id}`,
          headers: {
            Authorization: `Bearer ${cookie.load("TOKEN")}`,
          },
        })
          .then(() => {
            swal("Post deleted").then(() => {
              setLoad(false);
              window.location.href = "/";
            });
          })
          .catch((error) => {
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

export { setKey, deleteKey, deletePost };
