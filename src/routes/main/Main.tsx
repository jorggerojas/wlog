import React from "react";
import PostMinified from "../post/components/PostMinified";

const Main = () => {
  return (
    <div
      className="uk-grid uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-3@l uk-child-width-1-4@xl uk-padding-large"
      uk-grid="masonry: true"
      uk-height-match="target: .card-target"
    >
      <PostMinified
        large={true}
        title={"México"}
        date={"2020-12-12"}
        user={"mamberroi"}
        summary={"México es cool"}
        badge={"Country"}
        id={"1"}
      />
      <PostMinified
        large={true}
        title={"México"}
        date={"2020-12-12"}
        user={"mamberroi"}
        summary={"México es cool"}
        badge={"Country"}
        id={"2"}
      />
      <PostMinified
        large={true}
        title={"México"}
        date={"2020-12-12"}
        user={"mamberroi"}
        summary={
          "México es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es coolMéxico es cool"
        }
        badge={"Country"}
        id={"3"}
      />
      <PostMinified
        large={true}
        title={"México"}
        date={"2020-12-12"}
        user={"mamberroi"}
        summary={
          "México es cool mamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroi mamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroi mamberroimamberroimamberroimamberroimamberroimamberroimamberroimamberroi"
        }
        badge={"Country"}
        id={"4"}
      />
    </div>
  );
};

export default Main;
