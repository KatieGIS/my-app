import { useLocation } from "react-router"
import PropTypes from "prop-types"
import Button from "./Button"

const Header = ({title, adding, showAdd}) => {
    const location = useLocation() //listens which the pathname is. 
    // Purpose: To show the button (Add/Close) when it is on the main page.
    return (
        <header>

            <h1>{title}</h1>
            {location.pathname ==='/' && (
                <Button 
                    onClick = {adding} 
                    color = {showAdd ? 'red' : 'green' }
                    text={showAdd? 'Close':'Add'}>
                </Button>
            )}
            
            
        </header>
            
    )
}
// when nothing specified, pass default props
Header.defaultProps = {
    title: "default"
}

// validate the value types.
Header.propTypes = {
    title: PropTypes.string
}
// CSS in JS example.
// const headingStyles = {color: 'red', backgroundColor:'black'};
export default Header
