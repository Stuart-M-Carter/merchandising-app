import React, { useEffect, useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useInjection } from "inversify-react";
import { type IGraphService, GraphService } from "../../services/graph.service";
import Avatar from "@mui/material/Avatar";
import IDENTIFIERS from "../../services/identifiers";

export interface AppBarProps {
    title?: string;
    logo?: React.ReactNode;
    onMenuClick?: () => void;
    actions?: React.ReactNode;
    showSearch?: boolean;
    onSearch?: (query: string) => void;
    sticky?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

/**
 * AppBar rewritten to use MUI v5.
 * - Uses MUI AppBar / Toolbar / InputBase.
 * - Keeps same props as original component.
 */
const SearchContainer = styled("form")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    background: alpha(theme.palette.common.white, 0.06),
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(0.5, 1),
        width: 160,
    },
}));

const AppBar: React.FC<AppBarProps> = ({
    title = "App",
    logo,
    onMenuClick,
    actions,
    showSearch = false,
    onSearch,
    sticky = true,
    className,
    style,
}) => {
    const [query, setQuery] = useState("");
    const [avatar, setAvatar] = useState("./assets/missing_profile_image.svg");

    const graph = useInjection<IGraphService>(IDENTIFIERS.GraphService);

    useEffect( () => {
        async function fetchAvatar() {
            try {   

                const avatarUrl = await graph.getUserAvatar();

                setAvatar(avatarUrl);
            } catch (error) {
                console.error("Error fetching user avatar:", error);
            }   
        }

        fetchAvatar();
    },[]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(query);
    };

    return (
        <MuiAppBar
            position={sticky ? "sticky" : "relative"}
            className={className}
            sx={{
                // backgroundColor: "#0f172a",
                color: "common.white",
                boxShadow: "0 1px 3px rgba(2,6,23,0.4)",
                gap: 2,
                ...((style as any) ?? {}),
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2, px: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
                    {onMenuClick && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open menu"
                            onClick={onMenuClick}
                            title="Menu"
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {logo && <Box sx={{ display: "flex", alignItems: "center" }}>{logo}</Box>}

                    <Typography variant="h6" noWrap title={title} sx={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                </Box>

                {showSearch ? (
                    <SearchContainer role="search" onSubmit={handleSubmit} sx={{backgroundColor: "#f4f5f7ff", color: "black"}}>
                        <label htmlFor="mui-appbar-search" style={{ display: "none" }}>
                            Search
                        </label>
                        <StyledInput
                            id="mui-appbar-search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                        <IconButton type="submit" color="inherit" aria-label="search" size="large">
                            <SearchIcon />
                        </IconButton>
                    </SearchContainer>
                ) : (
                    <Box sx={{ flex: 1 }} />
                )}

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{actions}</Box>

                <Box sx={{ marginLeft: 'auto' }}>
                    <IconButton color="inherit" sx={{ '&:focus': { outline: 'none' }}}>
                        <Avatar alt="User Name" src={avatar} />
                    </IconButton>
                </Box>

            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;

      {/* <MuiAppBar position="fixed" sx={{ zIndex: (theme :Theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, '&:focus': {
      outline: 'none', // Removes the default focus outline
    },
    // Optionally, to remove the specific MUI focus-visible overlay:
    '&.Mui-focusVisible': {
      backgroundColor: 'transparent', 
    } }} // Hide icon when drawer is open
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Merchandising
            </Typography>
          </Toolbar>
      </MuiAppBar>*/}
