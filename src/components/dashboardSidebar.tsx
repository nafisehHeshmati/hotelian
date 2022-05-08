import { FC, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Drawer,
  ListItem,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import NavItem from "./navItem";
import HomeIcon from "@mui/icons-material/Home";
import InterestsIcon from "@mui/icons-material/Interests";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getToken } from "../utils/getSetToken";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { LoadingButton } from "@mui/lab";

const items = [
  {
    href: "/",
    icon: <HomeIcon fontSize="small" />,
    title: "Home",
  },
  {
    href: "/login",
    icon: <AccountCircleIcon fontSize="small" />,
    title: "Login",
  },
  {
    href: "/posts",
    icon: <InterestsIcon fontSize="small" />,
    title: "Posts",
  },
];

interface DashboardSidebarPropsType {
  open: boolean;
  onClose: () => void | undefined;
  handleOnLogout: () => void;
  logouting: boolean;
}

const DashboardSidebar: FC<DashboardSidebarPropsType> = ({
  open,
  onClose,
  handleOnLogout,
  logouting,
}) => {
  const router = useRouter();

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "primary.main",
        }}
      >
        <div>
          <Box
            sx={{
              pt: 3,
              display: "flex",
              alignItem: "center",
              justifyContent: "space-around",
              padding: "1rem 0",
              color: "black",
            }}
          >
            <NextLink href="/" passHref>
              <a>logo here</a>
            </NextLink>
            <div>
              <Typography color="inherit" variant="subtitle1">
                Hotelian
              </Typography>
              <Typography color="neutral.400" variant="body2">
                Admin panel{" "}
              </Typography>
            </div>
          </Box>
          {/* <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            ></Box>
          </Box> */}
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
          }}
        />
        <Box
          sx={{
            flexGrow: 1,
            padding: "1rem 0 ",
          }}
        >
          {items.map((item, index) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
              disabled={
                (index == 1 && !!getToken()) || (index == 2 && !getToken())
              }
            />
          ))}

          {getToken() && (
            <ListItem
              disableGutters
              sx={{
                display: "flex",
                mb: 0.5,
                py: 0,
                px: 2,
                color: "black ",
              }}
            >
              <LoadingButton
                loading={logouting}
                sx={{
                  borderRadius: 1,
                  color: "black",
                  justifyContent: "flex-start",
                  px: 3,
                  py: 10,
                  textAlign: "left",
                  textTransform: "none",
                  width: "100%",

                  "&:hover": {
                    backgroundColor: "rgba(100,100,100, 0.08)",
                  },
                }}
                component="a"
                startIcon={<ExitToAppIcon fontSize="small" />}
                disableRipple
                onClick={handleOnLogout}
              >
                <Box sx={{ flexGrow: 1 }}>Exit</Box>
              </LoadingButton>
            </ListItem>
          )}
        </Box>
        {/* <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/static/images/sidebar_pro.png"
            />
          </Box>
          <NextLink
            href="https://material-kit-pro-react.devias.io/"
            passHref
          >
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button>
          </NextLink>
        </Box> */}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "primary.main",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;
