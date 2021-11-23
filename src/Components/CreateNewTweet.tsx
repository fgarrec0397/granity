import { UserOutlined } from "@ant-design/icons/lib/icons";
import { Avatar } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import Emoji from "../Icons/Emoji";
import Gif from "../Icons/GIF";
import Medias from "../Icons/Medias";
import Poll from "../Icons/Poll";
import Schedule from "../Icons/Schedule";
import Button from "./Button";
import StyledWrapper, { StyledWrapperProps } from "./StyledWrapper";
import Textarea from "./Textarea";

interface FeedHeaderStyles {
  wrapper?: StyledWrapperProps;
  inputWrapper?: StyledWrapperProps;
  iconsWrapper?: StyledWrapperProps;
  iconWrapper?: StyledWrapperProps;
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
      margin-top: 9px;
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
  iconWrapper: {
    css: css`
      padding: 5px;
      display: flex;
      align-items: center;
      border-radius: 100%;
      cursor: pointer;

      &:hover {
        background-color: #1da1f21f;
      }
    `,
  },
};

const CreateNewTweet: FC = () => {
  return (
    <StyledWrapper {...styles.wrapper}>
      <Avatar size={40} icon={<UserOutlined />} />
      <StyledWrapper {...styles.inputWrapper}>
        <Textarea />
        <StyledWrapper {...styles.bottomWrapper}>
          <StyledWrapper {...styles.iconsWrapper}>
            <StyledWrapper {...styles.iconWrapper}>
              <Medias />
            </StyledWrapper>
            <StyledWrapper {...styles.iconWrapper}>
              <Gif />
            </StyledWrapper>
            <StyledWrapper {...styles.iconWrapper}>
              <Emoji />
            </StyledWrapper>
            <StyledWrapper {...styles.iconWrapper}>
              <Poll />
            </StyledWrapper>
            <StyledWrapper {...styles.iconWrapper}>
              <Schedule />
            </StyledWrapper>
          </StyledWrapper>
          <Button type="primary">Tweet</Button>
        </StyledWrapper>
      </StyledWrapper>
    </StyledWrapper>
  );
};

export default CreateNewTweet;
