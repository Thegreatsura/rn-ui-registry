import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { cssInterop } from 'react-native-css-interop';

// Configure standard RN components to support className in NativeWind v4
cssInterop(View, { className: 'style' });
cssInterop(Text, { className: 'style' });
cssInterop(Pressable, { className: 'style' });
cssInterop(Image, { className: 'style' });
cssInterop(ScrollView, { className: 'style' });
