import {Form, FormLayout, TextField, Button, ColorPicker} from '@shopify/polaris';

const MyForm = (props)=>{

    return (
        <Form 
        onSubmit={props.handleSubmit} 
        >
            <FormLayout>
                <TextField 
                    label="Enter a quote"
                    minLength="5"
                    maxLength="100"
                    value={props.text}
                    onChange={props.setText}
                    id="inputText"
                    name="inputText"
                    
                />
                <ColorPicker 
                    allowAlpha={true}
                    color={props.color}
                    onChange={props.setColor}
                    id="colorPicker"
                />
                <Button submit>Get Colored Quote</Button>
            </FormLayout>
        </Form>
    );
};

export default MyForm;