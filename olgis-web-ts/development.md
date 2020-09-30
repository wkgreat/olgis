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

## Tip3: value validation
```typescript
<TextField id="standard-basic" label="图层名称" value={inputName}
           margin="normal" fullWidth={true}
           onChange={handleInputNameChange}
           checker={(s)=>!!s}
           errorText={"图层名称不能为空"}
/>
```
* `chcecker` and `errorText` are used for vaidate value.