import { Vector3 } from "@react-three/fiber";
import React, { FC } from "react";
import { css } from "styled-components";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Button, { ButtonStyles } from "./Button";
import Link, { LinkStyles } from "./Link";
import TwitterLogo from "../Icons/TwitterLogo";
import Box from "./Box";
import StyledWrapper, { StyledWrapperProps } from "./StyledWrapper";
import Home from "../Icons/Home";
import Explore from "../Icons/Explore";
import Lists from "../Icons/Lists";
import Messages from "../Icons/Messages";
import More from "../Icons/More";
import Notifications from "../Icons/Notifications";
import Profile from "../Icons/Profile";
import BookMarks from "../Icons/BookMarks";
import Typography, { TypographyStyles } from "./Typography";
import ProfilePicture from "./ProfilePicture";

interface Props {
  scale: Vector3;
}

interface SideMenuStyles {
  wrapper?: StyledWrapperProps;
  topSection?: StyledWrapperProps;
  bottomSection?: StyledWrapperProps;
  logoWrapper?: StyledWrapperProps;
  linksWrapper?: StyledWrapperProps;
  navLinkWrapper?: StyledWrapperProps;
  selectedNavLinkWrapper?: StyledWrapperProps;
  navIconWrapper?: StyledWrapperProps;
  link?: LinkStyles;
  tweetButton?: ButtonStyles;
  userInformations?: StyledWrapperProps;
  userInformationsTextWrapper?: StyledWrapperProps;
  userName?: TypographyStyles;
  userUserName?: TypographyStyles;
}

const styles: SideMenuStyles = {
  wrapper: {
    css: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 1em 0.5em;
      height: 100%;
    `,
  },
  logoWrapper: {
    css: css`
      padding: 12px;
    `,
  },
  linksWrapper: {
    css: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    `,
  },
  navLinkWrapper: {
    css: css`
      display: flex;
      padding: 12px 16px 12px 12px;
    `,
  },
  selectedNavLinkWrapper: {
    css: css`
      display: flex;
      padding: 12px 16px 12px 12px;
      font-weight: bold;
    `,
  },
  navIconWrapper: {
    css: css`
      width: 24px;
      height: 24px;
      margin-right: 20px;
    `,
  },
  link: {
    css: css`
      border-radius: 28px;

      &:hover {
        background-color: #e9e9e9;
      }
    `,
  },
  tweetButton: {
    css: css`
      width: 100%;
      margin-top: 12px;
    `,
  },
  userInformations: {
    css: css`
      display: flex;
      padding: 12px;
      border-radius: 34px;

      &:hover {
        background-color: #e9e9e9;
        cursor: pointer;
      }
    `,
  },
  userInformationsTextWrapper: {
    css: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.5em;
    `,
  },
  userName: {
    css: css`
      font-size: 15px;
      font-weight: bold;
    `,
  },
  userUserName: {
    css: css`
      font-size: 15px;
      color: #818f99;
    `,
  },
};

const SideMenu: FC<Props> = ({ scale }) => {
  return (
    <Box
      position={[-1.15, 0, 0]}
      scale={scale}
      heightPx={907}
      widthPx={272}
      styles={{
        left: "1px",
      }}
      text="1 Hello motha fuck***"
    >
      <StyledWrapper {...styles.wrapper}>
        <StyledWrapper {...styles.topSection}>
          <StyledWrapper {...styles.logoWrapper}>
            <TwitterLogo />
          </StyledWrapper>
          <StyledWrapper as="nav" {...styles.linksWrapper}>
            <Link to="/" {...styles.link}>
              <StyledWrapper {...styles.selectedNavLinkWrapper}>
                <StyledWrapper {...styles.navIconWrapper}>
                  <Home />
                </StyledWrapper>
                Home
              </StyledWrapper>
            </Link>
            <Link to="/" {...styles.link}>
              <StyledWrapper {...styles.navLinkWrapper}>
                <StyledWrapper {...styles.navIconWrapper}>
                  <Explore />
                </StyledWrapper>
                Explore
              </StyledWrapper>
            </Link>
            <Link to="/" {...styles.link}>
              <StyledWrapper {...styles.navLinkWrapper}>
                <StyledWrapper {...styles.navIconWrapper}>
                  <Notifications />
                </StyledWrapper>
                Notifications
              </StyledWrapper>
            </Link>
            <Link to="/" {...styles.link}>
              <StyledWrapper {...styles.navLinkWrapper}>
                <StyledWrapper {...styles.navIconWrapper}>
                  <Messages />
                </StyledWrapper>
                Messages
              </StyledWrapper>
            </Link>
            <Link to="/" {...styles.link}>
              <StyledWrapper {...styles.navLinkWrapper}>
                <StyledWrapper {...styles.navIconWrapper}>
                  <BookMarks />
                </StyledWrapper>
                Bookmarks
              </StyledWrapper>
            </Link>
            <Link to="/" {...styles.link}>
              <StyledWrapper {...styles.navLinkWrapper}>
                <StyledWrapper {...styles.navIconWrapper}>
                  <Lists />
                </StyledWrapper>
                Lists
              </StyledWrapper>
            </Link>
            <Link to="/" {...styles.link}>
              <StyledWrapper {...styles.navLinkWrapper}>
                <StyledWrapper {...styles.navIconWrapper}>
                  <Profile />
                </StyledWrapper>
                Profile
              </StyledWrapper>
            </Link>
            <Link to="/" {...styles.link}>
              <StyledWrapper {...styles.navLinkWrapper}>
                <StyledWrapper {...styles.navIconWrapper}>
                  <More />
                </StyledWrapper>
                More
              </StyledWrapper>
            </Link>
          </StyledWrapper>
          <Button type="primary" size="large" {...styles.tweetButton}>
            Tweet
          </Button>
        </StyledWrapper>
        <StyledWrapper {...styles.bottomSection}>
          <StyledWrapper {...styles.userInformations}>
            <ProfilePicture />
            <StyledWrapper {...styles.userInformationsTextWrapper}>
              <Typography {...styles.userName}>Fabrice Garrec</Typography>
              <Typography {...styles.userUserName}>@coolDevFab</Typography>
            </StyledWrapper>
          </StyledWrapper>
        </StyledWrapper>
      </StyledWrapper>
    </Box>
  );
};

export default SideMenu;
