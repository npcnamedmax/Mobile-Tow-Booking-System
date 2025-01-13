import { forwardRef, ReactNode } from 'react';
import React from 'react';
import { Link } from 'expo-router';
import Button, { Props as BtnProps } from '@/components/general/Button';
import { View } from 'react-native';

type Props = {
    href: any;
    asChild?: boolean;
} & BtnProps;

const LinkButton = forwardRef<View, Props>(({ href, asChild, ...btnProps } : Props, ref) => { //dont destructure children as it is part of btnprops
    return (
        <Link href={href} asChild>
            <Button {...btnProps} ref={ref} /> 
        </Link>
    );
});

export { LinkButton };