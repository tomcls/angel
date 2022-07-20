export default function AppStyle() {
    const mainThemeOptions = {
        components: {
            MuiSvgIcon: {
                styleOverrides: {
                    root: ({ theme }) => ({ // using with theme
                        color: theme.palette.primary.main,
                    }),
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: ({ theme }) => ({ // using with theme
                        width: '100%',
                        marginBottom: '20px'
                    }),
                },
            },
            MuiFormControl: {
                styleOverrides: {
                    root: ({ theme }) => ({ // using with theme
                        width: '100%',
                        marginTop: '26px',
                        marginBottom: '0px !important'
                    }),
                },
            },
        },
        palette: {
            primary: {
                light: '#0d99ff',
                main: '#001b8a',
                dark: '#111827',
                contrastText: '#fff',
            },
            secondary: {
                light: 'rgb(63, 199, 154)',
                main: '#10b981',
                dark: 'rgb(11, 129, 90)',
                contrastText: '#fff',
            },
            light: {
                main: '#fff',
                contrastText: '#fff',
            },
            drawerIcon: {
                main: 'rgb(209, 213, 219)',
                selected: 'rgba(255, 255, 255, 0.08)',
                contrastText: '#fff',
            },
            drawerIconDark: {
                main: 'rgb(107, 114, 128)',
                contrastText: '#fff',
            },
        }
    }
    const drawerThemeOptions = {
        components: {
            MuiSvgIcon: {
                styleOverrides: {
                    root: ({ theme }) => ({ // using with theme
                        color: theme.palette.drawerIcon.main,
                    }),
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: ({ theme }) => ({ // using with theme
                        color: theme.palette.drawerIcon.main,
                        "&:hover": {
                            backgroundColor: theme.palette.drawerIcon.selected,
                            borderRadius: '8px',
                        },
                        '&.active ': {
                            color: theme.palette.primary.light,
                            backgroundColor: theme.palette.drawerIcon.selected,
                            borderRadius: '8px',
                        },
                        '&.active .MuiTypography-root ': {
                            color: theme.palette.primary.light,
                        },
                    }),
                },
            },
            MuiListItemText: {
                styleOverrides: {
                    root: ({ theme }) => ({ // using with theme
                        color: theme.palette.drawerIcon.main,
                        "& .MuiListItemText-primary": {
                            fontSize: '0.8em',
                            fontWeight: 'bold',
                        },
                        '&.active .MuiTypography-root': {
                            color: theme.palette.primary.light,
                        },
                    }),
                },
            },
        }
    }
    return {
        main: (params) => {
            return mainThemeOptions;
        },
        drawer: (params) => {
            return drawerThemeOptions;
        }
    }
}