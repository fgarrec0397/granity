import { UserOutlined } from "@ant-design/icons/lib/icons";
import { Avatar } from "antd";
import React, { FC } from "react";
import {
  css,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
} from "styled-components";
import OfficialAccount from "../Icons/OfficialAccount";
import StyledWrapper, { StyledWrapperProps } from "./StyledWrapper";
import Typography, { TypographyStyles } from "./Typography";
import baseTheme from "../theme/baseTheme";
import Reply from "../Icons/Reply";
import Retweet from "../Icons/Retweet";
import Like from "../Icons/Like";
import Share from "../Icons/Share";
import { dotBeforeStyles } from "../theme/mixins";

interface Props {
  hasImage?: boolean;
}

interface TweetPostStyles {
  wrapper?: StyledWrapperProps;
  rightWrapper?: StyledWrapperProps;
  iconsWrapper?: StyledWrapperProps;
  bottomWrapper?: StyledWrapperProps;
  bottomImageWrapper?: StyledWrapperProps;
  postUserTitleWrapper?: StyledWrapperProps;
  postDescription?: TypographyStyles;
  postUserTitle?: TypographyStyles;
  postUserUserName?: TypographyStyles;
  postDate?: TypographyStyles;
  imageWrapper?: StyledWrapperProps;
  iconWrapper?: StyledWrapperProps;
  actionValue?: TypographyStyles;
}

interface ActionsMappingModel {
  [key: string]: {
    color: string;
    backgroundColor: string;
  };
}

const styles: TweetPostStyles = {
  wrapper: {
    css: css`
      width: 100%;
      display: flex;
    `,
  },
  rightWrapper: {
    css: css`
      width: 88%;
      margin-left: 0.75em;

      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      textarea {
        width: 100%;
        &::placeholder {
          color: #61686e !important;
        }
      }
    `,
  },
  bottomWrapper: {
    css: css`
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 0.75em;
    `,
  },
  bottomImageWrapper: {
    css: css`
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 0.3em;
    `,
  },
  iconsWrapper: {
    css: css`
      width: 60%;
      display: flex;
      justify-content: space-around;
      margin-top: 1em;
      margin-left: 6px;
    `,
  },
  postDescription: {
    css: css`
      height: 40px;
      margin: 0.25em 0;
      font-size: 15px;
      line-height: 1.3;
    `,
  },
  postUserTitle: {
    css: css`
      font-size: 15px;
      font-weight: bold;
      margin-right: 2px;
    `,
  },
  postUserTitleWrapper: {
    css: css`
      display: flex;
      align-items: center;
      margin-bottom: 0.2em;
    `,
  },
  postUserUserName: {
    css: css`
      font-size: 15px;
      margin-left: 2px;
      color: ${baseTheme.colors.text.light};
    `,
  },
  postDate: {
    css: css`
      display: flex;
      align-items: center;
      font-size: 15px;
      color: ${baseTheme.colors.text.light};

      ${dotBeforeStyles()}
    `,
  },
  iconWrapper: {
    css: css`
      padding: 5px;
      display: flex;
      align-items: center;
      border-radius: 100%;
      transition: all 0.1s ease-in;
    `,
  },
  actionValue: {
    css: css`
      margin-left: 7px;
    `,
  },
};

const actionsMappging: ActionsMappingModel = {
  reply: {
    color: "#1DA1F2",
    backgroundColor: "#1da1f21f",
  },
  retweet: {
    color: "rgb(0, 186,124)",
    backgroundColor: "rgba(0, 186,124, 0.1)",
  },
  like: {
    color: "rgb(249, 24, 186)",
    backgroundColor: "rgba(249, 24, 186, 0.1)",
  },
  share: {
    color: "#1DA1F2",
    backgroundColor: "#1da1f21f",
  },
};

const TweetPost: FC<Props> = ({ hasImage }) => {
  const actionWrapper = (type: string): FlattenSimpleInterpolation => {
    const { color, backgroundColor } = actionsMappging[type];
    return css`
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.1s ease-in;

      &:hover {
        color: ${color};

        > div {
          background-color: ${backgroundColor};
        }
        svg {
          fill: ${color};
        }
      }
    `;
  };
  return (
    <StyledWrapper {...styles.wrapper}>
      <Avatar size={40} icon={<UserOutlined />} />
      <StyledWrapper {...styles.rightWrapper}>
        <StyledWrapper {...styles.postUserTitleWrapper}>
          <Typography as="p" {...styles.postUserTitle}>
            John Doe
          </Typography>
          <OfficialAccount />
          <Typography {...styles.postUserUserName}>@johnDoe</Typography>
          <Typography {...styles.postDate}>2h</Typography>
        </StyledWrapper>
        <Typography as="p" {...styles.postDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ante
          mauris, rhoncus id consectetur sit.
        </Typography>
        {hasImage ? (
          <StyledWrapper {...styles.imageWrapper}>
            <img
              src="https://picsum.photos/500/280"
              alt="bla"
              style={{
                maxWidth: "100%",
                borderRadius: "11px",
                height: "100%",
                display: "block",
              }}
            />
          </StyledWrapper>
        ) : null}
        <StyledWrapper
          {...(hasImage ? styles.bottomImageWrapper : styles.bottomWrapper)}
        >
          <StyledWrapper css={actionWrapper("reply")}>
            <StyledWrapper {...styles.iconWrapper}>
              <Reply />
            </StyledWrapper>
            <Typography {...styles.actionValue}>267</Typography>
          </StyledWrapper>
          <StyledWrapper css={actionWrapper("retweet")}>
            <StyledWrapper {...styles.iconWrapper}>
              <Retweet />
            </StyledWrapper>
            <Typography {...styles.actionValue}>84</Typography>
          </StyledWrapper>
          <StyledWrapper css={actionWrapper("like")}>
            <StyledWrapper {...styles.iconWrapper}>
              <Like />
            </StyledWrapper>
            <Typography {...styles.actionValue}>754</Typography>
          </StyledWrapper>
          <StyledWrapper css={actionWrapper("share")}>
            <StyledWrapper {...styles.iconWrapper}>
              <Share />
            </StyledWrapper>
          </StyledWrapper>
        </StyledWrapper>
      </StyledWrapper>
    </StyledWrapper>
  );
};

export default TweetPost;
