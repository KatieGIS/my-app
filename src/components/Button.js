
import PropTypes from "prop-types"
const Button = ({color,text, onClick}) => {
    // const onClick = (e) => {
    //     console.log(e);
    // }
    return (
        <button 
            onClick={onClick} 
            className='btn' 
            style={{backgroundColor: color}} 
        >
        {text}
        </button>
    )
}
Button.defaultProps = {
    color: "green"
}
Button.protypes = {
    color: PropTypes.string,
    text: PropTypes.string
}
export default Button
