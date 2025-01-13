import React from 'react';
import { Pressable, StyleSheet, PressableProps, View, TextStyle } from "react-native";
import { forwardRef } from "react";
import { Text, useThemeColor } from '@/components/Themed';


// Converts Button to Pressable
export type Props = {
  text?: string;
  textStyle?:TextStyle; //dont allow color as it follows theme
  pressableStyle?: PressableProps['style']; 
} & Omit<PressableProps, 'style' | 'ref'> //exclude style and ref


const Button = forwardRef<View, Props>(({ children, textStyle, pressableStyle, ...pressableProps } : Props, ref) => { //forwardRef is only useful if a ref is passed to the component,
                                                                                              //as it will pass the ref to child.
                                                                                              //use View instead of Pressable as target forwardRef component
                                                                                              //because Pressable itself forwards ref to a View that it wraps
                                                                                              //so you are actually forwarding ref to View                                                                                       //Props is the properties that component will accept
  const bgColor = useThemeColor({}, 'background'); //need to generate style that is based on hook inside a function component                                                                                           
  const styles = createStyle(bgColor); //dynamic style based on bgColor
  return (//might need to flatten
    <Pressable {...pressableProps} ref={ref} style={({ pressed }) => [styles.container, pressableStyle, pressed && { opacity: 0.5 }]}>
      {({ pressed, hovered }) => (
        typeof children === 'function' ? ( //check if children is a function
          children({ pressed, hovered }) //pass pressed and hovered state to children
        ) : (
          (typeof children ==='string') ? <Text adjustsFontSizeToFit style={[styles.text, textStyle]}>{children}</Text> : //if it is a string put it in Text

            <>{children}</> //fragment is used in case children is multiple react nodes
        
        )
      )}
    </Pressable>
  );
});

function createStyle(backgroundColor?: string) {
  return StyleSheet.create({
    container: {
      backgroundColor: backgroundColor ?? '#000',
      padding: 15,
      alignItems: 'center',
      borderRadius: 100,
      width: 'auto',
      borderWidth: 2,
      borderColor: '#fff',
    },
    text: {
      fontWeight: '600',
    },
  });
}

export default Button;


