import type { InputFilterProps } from "../api";


const InputFilter = ({input, handleInput}: InputFilterProps) => {

    return(
        <input 
            value={input}
            onChange={e => handleInput(e.target.value)}
        />
    )
}

export default InputFilter;