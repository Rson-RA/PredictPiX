import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop, Rect} from 'react-native-svg';
import {colors, spacing} from '../styles/theme';

interface ChartProps {
  data: number[];
  style?: any;
}

const Chart = ({data, style}: ChartProps) => {
  const width = Dimensions.get('window').width - spacing.lg * 4;
  const height = 200;
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * width,
    y: height - ((value - minValue) / range) * (height * 0.8), // Use 80% of height for better visualization
  }));

  // Create a smooth curve through the points
  const pathData = points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }
    const prevPoint = points[index - 1];
    const controlX = (prevPoint.x + point.x) / 2;
    return `${path} C ${controlX} ${prevPoint.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, '');

  // Create fill path by extending the line to the bottom
  const fillPathData = `${pathData} L ${width} ${height} L 0 ${height} Z`;

  return (
    <View style={[styles.container, style]}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.accent.primary} stopOpacity="0.2" />
            <Stop offset="1" stopColor={colors.accent.primary} stopOpacity="0.0" />
          </LinearGradient>
        </Defs>
        
        {/* Background gradient */}
        <Path
          d={fillPathData}
          fill="url(#fillGradient)"
          strokeWidth={0}
        />
        
        {/* Line */}
        <Path
          d={pathData}
          fill="none"
          stroke={colors.accent.primary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
});

export default Chart; 