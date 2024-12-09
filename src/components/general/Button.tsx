import { Pressable, StyleSheet, PressableProps, View, TextStyle } from "react-native";
import { forwardRef } from "react";
import { Text, useThemeColor } from '@/components/Themed';


// Converts Button to Pressable
type Props = {
  text?: string;
  textStyle?:TextStyle; //dont allow color as it follows theme
  pressableStyle?: PressableProps['style']; 
} & Omit<PressableProps, 'style' | 'ref'> //exclude style and ref


const Button = forwardRef<View, Props>(({ children, textStyle, pressableStyle, ...pressableProps } : Props, ref) => { //forwardRef is only useful if a ref is passed to the component,
                                                                                              //as it will pass the ref to child.
                                                                                              //use View instead of Pressable as target forwardRef component
                                                                                              //because Pressable itself forwards ref to a View that it wraps
                                                                                              //so you are actually forwarding ref to View
                                                                                              //Props is the properties that component will accept
  const bgColor = useThemeColor({}, 'background'); //need to generate style that is based on hook inside a function component                                                                                           
  const styles = createStyle(bgColor); 
  return (//might need to flatten
    <Pressable {...pressableProps} ref={ref} style={pressableStyle ?? styles.container}>
      {typeof children === 'function' ? ( //check if children is a function
          
          children({ pressed: false, hovered: false }) //pass false for pressed and hovered to children if it is a function
        ) : (
          <Text style={textStyle ?? styles.text}>{children}</Text>
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
      marginVertical: 10,
      borderWidth: 2,
      borderColor: '#fff',
    },
    text: {
      fontSize: 16,
      fontWeight: '600',
    },
  });
}

export default Button;


