import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

class MenuButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        this.setState({anchorEl: event.currentTarget})
    };

    handleClose() {
        this.setState({anchorEl: null})
    };



    render() {

        return (
            <Box
                display="flex"
                alignItems="center"
                component='div'
            >
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                    <Typography variant="button">{this.props.label}</Typography>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    className={this.props.menubutton}
                >
                    {this.props.children}
                </Menu>
            </Box>

        );
    }

};

export default MenuButton;