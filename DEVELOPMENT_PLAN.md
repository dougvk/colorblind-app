# Colorblind App Development Plan

## 1. Image Selection Implementation ✓
- Install `expo-image-picker` ✓
- Create image selection component ✓
  - Add UI button for picking images ✓
  - Handle permissions gracefully ✓
  - Implement image selection from gallery ✓
  - Display selected image ✓
  - Add error handling for failed selections ✓

## 2. Skia Integration and Setup
- Replace image-manipulator with expo-skia
- Create Skia canvas wrapper component
- Set up basic image rendering in Skia
- Implement side-by-side preview layout
- Handle image scaling and fitting

## 3. Color Matrix Implementation
- Create color transformation utilities:
  - Define color matrix interface
  - Implement test grayscale matrix
  - Document matrix mathematics
- Implement colorblindness simulation:
  - Research red-green color transformation
  - Create specific color matrix
  - Add matrix application logic
  - Test with various images

## 4. UI and Performance
- Single-button filter application
- Loading states during processing
- Error handling for failed operations
- Performance optimization:
  - Proper canvas sizing
  - Efficient image loading
  - GPU utilization monitoring

## 5. Testing and Documentation
- Test on various devices and image sizes
- Document color transformation approach
- Add helpful UI text explaining the transformation
- Create usage examples

## Future Considerations
- Additional color vision deficiency filters
- Image export functionality
- Share transformed images
- Compare multiple filters side by side

## Troubleshooting Guide

### Native Module Issues
If you encounter "Cannot find native module" errors:
1. Stop the development server
2. Clear Expo cache and restart:
   ```bash
   npx expo start -c
   ```

### Development Build Setup
When adding native modules that aren't supported in Expo Go:
1. Install dev client:
   ```bash
   npx expo install expo-dev-client
   ```
2. Create native builds:
   ```bash
   npx expo prebuild
   ```
3. Run on simulator/device:
   ```bash
   npx expo run:ios
   # or
   npx expo run:android
   ```

### Common Issues
- Always restart development server after installing new packages
- Use development builds for native modules not supported in Expo Go
- Clear Metro bundler cache if changes aren't reflecting
- Check iOS/Android specific setup requirements for native modules

Commands:
npx expo prebuild
npx expo run:ios