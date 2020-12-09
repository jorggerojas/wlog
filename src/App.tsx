import React from "react";
import Header from "./routes/main/components/headerComponent/Header";
import Badge from "./routes/main/components/badgeComponent/Badge";
import PostMinified from "./routes/main/components/postMinifiedComponent/PostMinified";

const App = () => {
  const data = [
    { title: "POSTS", isActive: true },
    { title: "KEYWORDS", isActive: false },
    { title: "WRITERS", isActive: false },
  ];
  return (
    // <ThemeProvider theme={themes}>

    <div>
      <Header theme={"light"} />
      <Badge data={data} />
      <div
        className="uk-grid uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-3@l uk-child-width-1-4@xl uk-padding-large"
        uk-grid="masonry: true"
        uk-height-match="target: .card-target"
      >
        <PostMinified
          title={"México"}
          date={"2020-12-12"}
          user={"mamberroi"}
          summary={"México es cool"}
          badge={"Country"}
          id={"1"}
        />
        <PostMinified
          title={"México"}
          date={"2020-12-12"}
          user={"mamberroi"}
          summary={
            "México es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es cool"
          }
          badge={"Country"}
          id={"1"}
        />
        <PostMinified
          title={"México"}
          date={"2020-12-12"}
          user={"mamberroi"}
          summary={
            "México es cool mamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroi mamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroi mamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroi"
          }
          badge={"Country"}
          id={"1"}
        />
      </div>
    </div>

    //</ThemeProvider>
  );
};
export default App;
