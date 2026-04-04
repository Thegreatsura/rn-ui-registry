import * as React from 'react';
import { View, type TextProps, type ViewProps } from 'react-native';

import { Label } from './label';
import { Text } from './text';

type FormErrors = Record<string, string | undefined>;

type FormContextValue = {
    errors: FormErrors;
};

const FormContext = React.createContext<FormContextValue>({ errors: {} });

function useFormContext() {
    return React.useContext(FormContext);
}

const FormFieldContext = React.createContext<{ name: string } | null>(null);

type FormProps = ViewProps & {
    errors?: FormErrors;
};

function Form({ errors = {}, style, children, ...props }: FormProps) {
    const value = React.useMemo(() => ({ errors }), [errors]);

    return (
        <FormContext.Provider value={value}>
            <View style={style} {...props}>
                {children}
            </View>
        </FormContext.Provider>
    );
}

function FormField({ name, children }: { name: string; children: React.ReactNode }) {
    return (
        <FormFieldContext.Provider value={{ name }}>{children}</FormFieldContext.Provider>
    );
}

function FormItem({ style, ...props }: ViewProps) {
    return <View style={[{ gap: 8, alignSelf: 'stretch' }, style]} {...props} />;
}

function FormLabel(props: React.ComponentProps<typeof Label>) {
    return <Label {...props} />;
}

function FormControl({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

function FormDescription({ style, ...props }: TextProps) {
    return (
        <Text
            variant="muted"
            style={[{ fontSize: 13, lineHeight: 18 }, style]}
            {...props}
        />
    );
}

type FormMessageProps = TextProps & {
    name?: string;
};

function FormMessage({ name: nameProp, style, ...props }: FormMessageProps) {
    const { errors } = useFormContext();
    const field = React.useContext(FormFieldContext);
    const fieldName = nameProp ?? field?.name;

    if (!fieldName) {
        return null;
    }

    const msg = errors[fieldName];
    if (!msg) {
        return null;
    }

    return (
        <Text style={[{ fontSize: 13, color: '#dc2626', lineHeight: 18 }, style]} {...props}>
            {msg}
        </Text>
    );
}

export {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
};
