import { FormikErrors } from 'formik';
import * as React from 'react';
type Props = {
    message: string | FormikErrors<any> | string[] | FormikErrors<any>[];
    classNames?: string;
    withSpaceTop?: boolean;
    withSpaceBottom?: boolean;
};
declare const FieldError: ({ message, classNames, withSpaceTop, withSpaceBottom, }: Props) => React.JSX.Element;
export default FieldError;
