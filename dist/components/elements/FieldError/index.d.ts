import { FormikErrors } from 'formik';
import * as React from 'react';
interface Props {
    error: string | FormikErrors<any> | string[] | FormikErrors<any>[];
    classNames?: string;
    withSpaceTop?: boolean;
    withSpaceBottom?: boolean;
}
declare const FieldError: ({ error, classNames, withSpaceTop, withSpaceBottom, }: Props) => React.JSX.Element;
export default FieldError;
