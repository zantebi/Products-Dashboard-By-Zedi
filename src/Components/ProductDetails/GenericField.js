import React from 'react';
import { Form } from 'react-bootstrap';

const GenericField = ({ controlId, fieldLabel, feedBackText, placeHolder, isInvalidAction, onChaneHandler, controlStyleClass, isTextArea }) => {
    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{fieldLabel}</Form.Label>
            <Form.Control style={controlStyleClass} {...isTextArea ? { as: "textarea", rows: 3 } : { type: "text" }} placeholder={placeHolder} isInvalid={isInvalidAction} onChange={onChaneHandler} />
            <Form.Control.Feedback type="invalid">
                {feedBackText}
            </Form.Control.Feedback>
        </Form.Group>
    )
}


export default GenericField;