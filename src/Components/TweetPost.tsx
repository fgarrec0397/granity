import { UserOutlined } from "@ant-design/icons/lib/icons";
import { Avatar } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import OfficialAccount from "../Icons/OfficialAccount";
import StyledWrapper, { StyledWrapperProps } from "./StyledWrapper";
import Typography, { TypographyStyles } from "./Typography";
import baseTheme from "../theme/baseTheme";
import Reply from "../Icons/Reply";
import Retweet from "../Icons/Retweet";
import Like from "../Icons/Like";
import Share from "../Icons/Share";

interface Props {
  hasImage?: boolean;
}

interface TweetPostStyles {
  wrapper?: StyledWrapperProps;
  rightWrapper?: StyledWrapperProps;
  iconsWrapper?: StyledWrapperProps;
  bottomWrapper?: StyledWrapperProps;
  postUserTitleWrapper?: StyledWrapperProps;
  postDescription?: TypographyStyles;
  postUserTitle?: TypographyStyles;
  postUserUserName?: TypographyStyles;
  postDate?: TypographyStyles;
  imageWrapper?: StyledWrapperProps;
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
      margin-top: 15px;
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

      &::before {
        content: "";
        display: block;
        margin: 0 5px;
        width: 4px;
        height: 4px;
        background-color: ${baseTheme.colors.text.light};
        border-radius: 100%;
      }
    `,
  },
  imageWrapper: {
    css: css`
      margin-top: 0.25em;
    `,
  },
};

const TweetPost: FC<Props> = ({ hasImage }) => {
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
          mauris, rhoncus id consectetur sit amet, porttitor sed augue.
        </Typography>
        {hasImage ? (
          <StyledWrapper {...styles.imageWrapper}>
            <img
              src="https://picsum.photos/500/280"
              alt="bla"
              style={{ maxWidth: "100%", borderRadius: "11px" }}
            />
          </StyledWrapper>
        ) : null}
        <StyledWrapper {...styles.bottomWrapper}>
          <Reply />
          <Retweet />
          <Like />
          <Share />
        </StyledWrapper>
      </StyledWrapper>
    </StyledWrapper>
  );
};

export default TweetPost;
