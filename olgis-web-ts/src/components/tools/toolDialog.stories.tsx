import {storiesOf} from '@storybook/react'
import ToolDialog from "./toolDialog";
import React from "react";
import {action} from "@storybook/addon-actions";

const defaultToolDialog = () => (
    <ToolDialog
        open={true}
        title="默认工具对话框标题"
        onOK={action("onOK")}
        onCancel={action("onCancel")}
    >
        默认工具对话框内容
    </ToolDialog>
)

storiesOf("工具对话框", module)
    .add("默认工具对话框", defaultToolDialog);