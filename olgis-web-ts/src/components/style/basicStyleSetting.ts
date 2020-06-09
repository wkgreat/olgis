import {BoxProps} from "@material-ui/core";

export interface BasicStyleSettingProps<T,O> {

    /**
     * whether open(show) this FillSetting
     * */
    open ?: true

    /**
     * Fill | FillOptions to initialize the Fill Options value
     * */
    fillOrOptions ?: T | O

    /**
     * callback on the setting change
     * */
    onChange ?: (options: O) => void,

    /**
     * css of box(div)
     * */
    boxProps ?: BoxProps

}