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

interface FeedHeaderStyles {
  wrapper?: StyledWrapperProps;
  inputWrapper?: StyledWrapperProps;
  iconsWrapper?: StyledWrapperProps;
  bottomWrapper?: StyledWrapperProps;
}

const styles: FeedHeaderStyles = {
  wrapper: {
    css: css`
      width: 100%;
      display: flex;
    `,
  },
  inputWrapper: {
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

const CreateNewTweet: FC = () => {
  return (
    <StyledWrapper {...styles.wrapper}>
      <Avatar size={40} icon={<UserOutlined />} />
      <StyledWrapper {...styles.inputWrapper}>
        <TextArea
          size="large"
          autoSize
          bordered={false}
          placeholder="What's happening?"
        />
        <StyledWrapper {...styles.bottomWrapper}>
          <StyledWrapper {...styles.iconsWrapper}>
            <Medias />
            <Gif />
            <Poll />
            <Emoji />
            <Schedule />
          </StyledWrapper>
          <Button type="primary">Tweet</Button>
        </StyledWrapper>
      </StyledWrapper>
    </StyledWrapper>
  );
};

export default CreateNewTweet;
