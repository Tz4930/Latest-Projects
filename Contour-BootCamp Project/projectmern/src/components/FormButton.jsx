import PropTypes from 'prop-types';

export default function FormButton({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="relative flex justify-center item-center w-[75%] mx-auto py-2 mt-5 text-sm font-medium text-white bg-[#191919] border border-transparent rounded-md group hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onSubmit={handleSubmit}
            >
                {text}
            </button>
            :
            <></>
        }
        </>
    )
}

FormButton.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['Button']),
    action: PropTypes.string,
    text: PropTypes.string.isRequired
};