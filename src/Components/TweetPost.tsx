import { UserOutlined } from "@ant-design/icons/lib/icons";
import { Avatar, Input } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import Emoji from "../Icons/Emoji";
import Gif from "../Icons/GIF";
import Medias from "../Icons/Medias";
import Poll from "../Icons/Poll";
import Schedule from "../Icons/Schedule";
import baseTheme from "../theme/baseTheme";
import Button from "./Button";
import StyledWrapper, { StyledWrapperProps } from "./StyledWrapper";
import Typography, { TypographyStyles } from "./Typography";

const { TextArea } = Input;

interface TweetPostStyles {
  wrapper?: StyledWrapperProps;
  rightWrapper?: StyledWrapperProps;
  iconsWrapper?: StyledWrapperProps;
  bottomWrapper?: StyledWrapperProps;
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
};

const TweetPost: FC = () => {
  return (
    <StyledWrapper {...styles.wrapper}>
      <Avatar size={40} icon={<UserOutlined />} />
      <StyledWrapper {...styles.rightWrapper}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed ex
          corrupti repudiandae laborum quas. Eaque quos deserunt iure eos ex,
          necessitatibus cumque nemo facilis quas veniam, quisquam delectus qui.
          Possimus.
        </Typography>
        <StyledWrapper {...styles.bottomWrapper}>bottom wrapper</StyledWrapper>
      </StyledWrapper>
    </StyledWrapper>
  );
};

export default TweetPost;
