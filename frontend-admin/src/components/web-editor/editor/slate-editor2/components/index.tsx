import {ComponentProps, forwardRef, PropsWithChildren, ReactNode, Ref} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

interface BaseProps {
    className: string;

    [key: string]: unknown;
}

type OrNull<T> = T | null;

export const Button = forwardRef<HTMLSpanElement, {
    active: boolean;
} & ComponentProps<'span'>>(
    ((
        {
            className,
            active,
            reversed,
            ...props
        }: PropsWithChildren<{
            active: boolean;
            reversed: boolean;
        }> & BaseProps,
        ref: Ref<OrNull<HTMLSpanElement>>
    ) => (
        <span
            {...props}
            ref={ref as any}
            className={`${className} button ${active ? 'active' : ''} ${reversed ? 'reversed' : ''}`}
        />
    )) as any
);

export const EditorValue = forwardRef((
    (
        {
            className,
            value,
            ...props
        }: PropsWithChildren<{
            value: any;
        }> & BaseProps,
        ref: Ref<OrNull<null>>
    ) => {
        const textLines = value.document.nodes.map((node: any) => node.text).join('\n');
        return (
            <div ref={ref as any} {...props} className={`${className} editor-value`}>
                <div className="header">Slate value as text</div>
                <div className="content">{textLines}</div>
            </div>
        );
    }) as any
);

export const Icon = forwardRef<HTMLSpanElement, PropsWithChildren<BaseProps>>(
    (({className, ...props}: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLSpanElement>>) => (
        <span {...props} ref={ref as any} className={`material-icons ${className}`}/>
    )) as any
);

export const Instruction = forwardRef(
    (({className, ...props}: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLDivElement>>) => (
        <div {...props} ref={ref as any} className={`${className} instruction`}/>
    )) as any
);

export const Menu: any = forwardRef(
    (({className, ...props}: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLDivElement>>) => (
        <div {...props} ref={ref as any} className={`${className} menu`}/>
    )) as any
);

export const Portal = ({children}: { children: ReactNode }) => {
    return ReactDOM.createPortal(children, document.body);
};

interface ToolbarProps extends PropsWithChildren<BaseProps> {
    children: ReactNode;
}

export const Toolbar: any = forwardRef((
    ({className, ...props}: ToolbarProps, ref: Ref<OrNull<HTMLDivElement>>) => (
        <Menu {...props} ref={ref} className={`${className} toolbar`}/>
    )) as any
);
