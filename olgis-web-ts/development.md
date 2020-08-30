# Development Document

## Tip1: tool props
All the props of defined tool component should inherit from BaseToolProps    
see `baseToolProps.tsx`, like the props of `AddDrawLayer` component
```typescript
import {BoxProps} from "@material-ui/core"; 
import BaseToolProps from "../baseToolProps";
interface AddDrawLayerProps extends BaseToolProps{
    boxProps?: BoxProps
}
```

## Tip2: activation of tool
menu item or button or other activator to activate tool component by signal
* in tool component
  
```typescript
    useEffect(()=>{
        setOpen(props.open)
    }, [props.open, props.signal]);
```
* as for activator(here use `ListItemActivator` as an example)
```typescript
    <ListItemActivator label="添加XYZ瓦片图层" target={<AddXYZTileLayerTool/>}/>
```