import classnames from 'classnames'

import FontFamilyList from './FontFamilyList'
import {fontFamilyMarkStrategy, getMark, hasMark} from './FontFamilyUtils'


const FontFamilyDropdown = ({value, onChange, changeState, className, style}) => {
    let fontFamilyDefault = 0
    if (hasMark(value)) {
        fontFamilyDefault = getMark(value).data.get('fontFamilyIndex')
    }
    return (
        <select
            className={classnames(className)}
            style={style}
            onChange={({target: {value: fontFamilyIndex}}) => {
                onChange(fontFamilyMarkStrategy({value, fontFamilyIndex}))
            }}
            value={fontFamilyDefault}
        >
            {FontFamilyList.map((font, index) => (
                <option key={`slate-font-family-${index}`} value={index}>
                    {font.name}
                </option>
            ))}
        </select>
    )
}

export default FontFamilyDropdown