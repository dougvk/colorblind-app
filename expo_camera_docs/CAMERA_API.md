Title: Camera

URL Source: https://docs.expo.dev/versions/latest/sdk/camera/

Markdown Content:
![Image 1: Expo Camera icon](https://docs.expo.dev/static/images/packages/expo-camera.png)Expo Camera
-----------------------------------------------------------------------------------------------------

A React component that renders a preview for the device's front or back camera.

* * *

`expo-camera` provides a React component that renders a preview of the device's front or back camera. The camera's parameters such as zoom, torch, and flash mode are adjustable. Using `CameraView`, you can take photos and record videos that are saved to the app's cache. The component is also capable of detecting bar codes appearing in the preview. Run the [example](https://docs.expo.dev/versions/latest/sdk/camera#usage) on your device to see all these features working together.

Installation[](https://docs.expo.dev/versions/latest/sdk/camera/#installation)
------------------------------------------------------------------------------

`- ``npx expo install expo-camera`

If you are installing this in an [existing React Native app](https://docs.expo.dev/bare/overview), start by [installing `expo`](https://docs.expo.dev/bare/installing-expo-modules) in your project. Then, follow the [additional instructions](https://github.com/expo/expo/tree/main/packages/expo-camera) as mentioned by the library's README under "Installation in bare React Native projects" section.

Configuration in app config[](https://docs.expo.dev/versions/latest/sdk/camera/#configuration-in-app-config)
------------------------------------------------------------------------------------------------------------

You can configure `expo-camera` using its built-in [config plugin](https://docs.expo.dev/config-plugins/introduction) if you use config plugins in your project ([EAS Build](https://docs.expo.dev/build/introduction) or `npx expo run:[android|ios]`). The plugin allows you to configure various properties that cannot be set at runtime and require building a new app binary to take effect.

### Example app.json with config plugin[](https://docs.expo.dev/versions/latest/sdk/camera/#example-appjson-with-config-plugin)

```
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
          "recordAudioAndroid": true
        }
      ]
    ]
  }
}
```

### Configurable properties[](https://docs.expo.dev/versions/latest/sdk/camera/#configurable-properties)

| Name | Default | Description |
| --- | --- | --- |
| `cameraPermission` | `"Allow $(PRODUCT_NAME) to access your camera"` | Only for: 
iOS

A string to set the [`NSCameraUsageDescription`](https://docs.expo.dev/versions/latest/sdk/camera/#ios) permission message.

 |
| `microphonePermission` | `"Allow $(PRODUCT_NAME) to access your microphone"` | Only for: 

iOS

A string to set the [`NSMicrophoneUsageDescription`](https://docs.expo.dev/versions/latest/sdk/camera/#ios) permission message.

 |
| `recordAudioAndroid` | `true` | Only for: 

Android

A boolean that determines whether to enable the `RECORD_AUDIO` permission on Android.

 |

Are you using this library in a bare React Native app?[](https://docs.expo.dev/versions/latest/sdk/camera/#are-you-using-this-library-in-a)

Usage[](https://docs.expo.dev/versions/latest/sdk/camera/#usage)
----------------------------------------------------------------

> Only one Camera preview can be active at any given time. If you have multiple screens in your app, you should unmount `Camera` components whenever a screen is unfocused.

```
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
```

### Advanced usage[](https://docs.expo.dev/versions/latest/sdk/camera/#advanced-usage)

[Camera app example A complete example that shows how to take a picture and display it. Written in TypeScript.](https://github.com/expo/examples/tree/master/with-camera)

Web support[](https://docs.expo.dev/versions/latest/sdk/camera/#web-support)
----------------------------------------------------------------------------

Most browsers support a version of web camera functionality, you can check out the [web camera browser support here](https://caniuse.com/#feat=stream). Image URIs are always returned as base64 strings because local file system paths are unavailable in the browser.

### Chrome `iframe` usage[](https://docs.expo.dev/versions/latest/sdk/camera/#chrome-iframe-usage)

When using Chrome versions 64+, if you try to use a web camera in a cross-origin iframe nothing will render. To add support for cameras in your iframe simply add the attribute `allow="microphone; camera;"` to the iframe element:

```
<iframe src="..." allow="microphone; camera;">
  <!-- <CameraView /> -->
</iframe>
```

API[](https://docs.expo.dev/versions/latest/sdk/camera/#api)
------------------------------------------------------------

```
import { CameraView } from 'expo-camera';
```

Component[](https://docs.expo.dev/versions/latest/sdk/camera/#component)
------------------------------------------------------------------------

### `CameraView`[](https://docs.expo.dev/versions/latest/sdk/camera/#cameraview)

Type: `React.[Component](https://react.dev/reference/react/Component)<[CameraViewProps](https://docs.expo.dev/versions/latest/sdk/camera/#cameraviewprops)>`

### `active`[](https://docs.expo.dev/versions/latest/sdk/camera/#active)

Optional •

Type:

`boolean` • Default: `true`

A boolean that determines whether the camera should be active. Useful in situations where the camera may not have unmounted but you still want to stop the camera session.

### `animateShutter`[](https://docs.expo.dev/versions/latest/sdk/camera/#animateshutter)

Optional •

Type:

`boolean` • Default: `true`

A boolean that determines whether the camera shutter animation should be enabled.

### `autofocus`[](https://docs.expo.dev/versions/latest/sdk/camera/#autofocus)

Optional •

Type:

`[FocusMode](https://docs.expo.dev/versions/latest/sdk/camera/#focusmode)` • Default: `off`

Indicates the focus mode to use.

### `barcodeScannerSettings`[](https://docs.expo.dev/versions/latest/sdk/camera/#barcodescannersettings)

Optional •

Type:

`[BarcodeSettings](https://docs.expo.dev/versions/latest/sdk/camera/#barcodesettings)`

Example

```
<CameraView
  barcodeScannerSettings={{
    barcodeTypes: ["qr"],
  }}
/>
```

### `enableTorch`[](https://docs.expo.dev/versions/latest/sdk/camera/#enabletorch)

Optional •

Type:

`boolean` • Default: `false`

A boolean to enable or disable the torch.

### `facing`[](https://docs.expo.dev/versions/latest/sdk/camera/#facing)

Optional •

Type:

`[CameraType](https://docs.expo.dev/versions/latest/sdk/camera/#cameratype)` • Default: `'back'`

Camera facing. Use one of `CameraType`. When `front`, use the front-facing camera. When `back`, use the back-facing camera.

### `flash`[](https://docs.expo.dev/versions/latest/sdk/camera/#flash)

Optional •

Type:

`[FlashMode](https://docs.expo.dev/versions/latest/sdk/camera/#flashmode)` • Default: `'off'`

Camera flash mode. Use one of `FlashMode` values. When `on`, the flash on your device will turn on when taking a picture. When `off`, it won't. Setting it to `auto` will fire flash if required.

### `mirror`[](https://docs.expo.dev/versions/latest/sdk/camera/#mirror)

Optional •

Type:

`boolean` • Default: `false`

A boolean that determines whether the camera should mirror the image when using the front camera.

### `mode`[](https://docs.expo.dev/versions/latest/sdk/camera/#mode)

Optional •

Type:

`[CameraMode](https://docs.expo.dev/versions/latest/sdk/camera/#cameramode)` • Default: `'picture'`

Used to select image or video output.

### `mute`[](https://docs.expo.dev/versions/latest/sdk/camera/#mute)

Optional •

Type:

`boolean` • Default: `false`

If present, video will be recorded with no sound.

### `onBarcodeScanned`[](https://docs.expo.dev/versions/latest/sdk/camera/#onbarcodescanned)

Optional •

Type:

`(scanningResult: [BarcodeScanningResult](https://docs.expo.dev/versions/latest/sdk/camera/#barcodescanningresult)) => void`

Callback that is invoked when a barcode has been successfully scanned. The callback is provided with an object of the [`BarcodeScanningResult`](https://docs.expo.dev/versions/latest/sdk/camera/#barcodescanningresult) shape, where the `type` refers to the barcode type that was scanned, and the `data` is the information encoded in the barcode (in this case of QR codes, this is often a URL). See [`BarcodeType`](https://docs.expo.dev/versions/latest/sdk/camera/#barcodetype) for supported values.

`scanningResult: [BarcodeScanningResult](https://docs.expo.dev/versions/latest/sdk/camera/#barcodescanningresult)`

### `onCameraReady`[](https://docs.expo.dev/versions/latest/sdk/camera/#oncameraready)

Optional •

Type:

`() => void`

Callback invoked when camera preview has been set.

### `onMountError`[](https://docs.expo.dev/versions/latest/sdk/camera/#onmounterror)

Optional •

Type:

`(event: [CameraMountError](https://docs.expo.dev/versions/latest/sdk/camera/#cameramounterror)) => void`

Callback invoked when camera preview could not start.

`event: [CameraMountError](https://docs.expo.dev/versions/latest/sdk/camera/#cameramounterror)`

Error object that contains a `message`.

### `onResponsiveOrientationChanged`[](https://docs.expo.dev/versions/latest/sdk/camera/#onresponsiveorientationchanged)

Optional •

Type:

`(event: [ResponsiveOrientationChanged](https://docs.expo.dev/versions/latest/sdk/camera/#responsiveorientationchanged)) => void`

Callback invoked when responsive orientation changes. Only applicable if `responsiveOrientationWhenOrientationLocked` is `true`.

`event: [ResponsiveOrientationChanged](https://docs.expo.dev/versions/latest/sdk/camera/#responsiveorientationchanged)`

result object that contains updated orientation of camera

### `pictureSize`[](https://docs.expo.dev/versions/latest/sdk/camera/#picturesize)

A string representing the size of pictures [`takePictureAsync`](https://docs.expo.dev/versions/latest/sdk/camera/#takepictureasyncoptions) will take. Available sizes can be fetched with [`getAvailablePictureSizesAsync`](https://docs.expo.dev/versions/latest/sdk/camera/#getavailablepicturesizesasync). Setting this prop will cause the `ratio` prop to be ignored as the aspect ratio is determined by the selected size.

### `poster`[](https://docs.expo.dev/versions/latest/sdk/camera/#poster)

A URL for an image to be shown while the camera is loading.

### `ratio`[](https://docs.expo.dev/versions/latest/sdk/camera/#ratio)

Optional •

Type:

`[CameraRatio](https://docs.expo.dev/versions/latest/sdk/camera/#cameraratio)`

A string representing the aspect ratio of the preview. For example, `4:3` and `16:9`. Note: Setting the aspect ratio here will change the scaleType of the camera preview from `FILL` to `FIT`. Also, when using 1:1, devices only support certain sizes. If you specify an unsupported size, the closest supported ratio will be used.

### `responsiveOrientationWhenOrientationLocked`[](https://docs.expo.dev/versions/latest/sdk/camera/#responsiveorientationwhenorientationlocked)

Whether to allow responsive orientation of the camera when the screen orientation is locked (that is, when set to `true`, landscape photos will be taken if the device is turned that way, even if the app or device orientation is locked to portrait).

### `videoBitrate`[](https://docs.expo.dev/versions/latest/sdk/camera/#videobitrate)

The bitrate of the video recording in bits per second. Note: On iOS, you must specify the video codec when calling `recordAsync` to use this option.

### `videoQuality`[](https://docs.expo.dev/versions/latest/sdk/camera/#videoquality)

Optional •

Type:

`[VideoQuality](https://docs.expo.dev/versions/latest/sdk/camera/#videoquality)`

Specify the quality of the recorded video. Use one of `VideoQuality` possible values: for 16:9 resolution `2160p`, `1080p`, `720p`, `480p` : `Android only` and for 4:3 `4:3` (the size is 640x480). If the chosen quality is not available for a device, the highest available is chosen.

### `videoStabilizationMode`[](https://docs.expo.dev/versions/latest/sdk/camera/#videostabilizationmode)

Optional •

Type:

`[VideoStabilization](https://docs.expo.dev/versions/latest/sdk/camera/#videostabilization)`

The video stabilization mode used for a video recording. Use one of [`VideoStabilization.<value>`](https://docs.expo.dev/versions/latest/sdk/camera/#videostabilization). You can read more about each stabilization type in [Apple Documentation](https://developer.apple.com/documentation/avfoundation/avcapturevideostabilizationmode).

### `zoom`[](https://docs.expo.dev/versions/latest/sdk/camera/#zoom)

Optional •

Type:

`number` • Default: `0`

A value between `0` and `1` being a percentage of device's max zoom, where `0` means not zoomed and `1` means maximum zoom.

Static Methods[](https://docs.expo.dev/versions/latest/sdk/camera/#static-methods)
----------------------------------------------------------------------------------

### `dismissScanner()`[](https://docs.expo.dev/versions/latest/sdk/camera/#dismissscanner)

Dismiss the scanner presented by `launchScanner`.

### `getAvailableVideoCodecsAsync()`[](https://docs.expo.dev/versions/latest/sdk/camera/#getavailablevideocodecsasync)

Queries the device for the available video codecs that can be used in video recording.

A promise that resolves to a list of strings that represents available codecs.

### `isAvailableAsync()`[](https://docs.expo.dev/versions/latest/sdk/camera/#isavailableasync)

Check whether the current device has a camera. This is useful for web and simulators cases. This isn't influenced by the Permissions API (all platforms), or HTTP usage (in the browser). You will still need to check if the native permission has been accepted.

### `launchScanner(options)`[](https://docs.expo.dev/versions/latest/sdk/camera/#launchscanneroptions)

| Parameter | Type |
| --- | --- |
| options(optional) | `[ScanningOptions](https://docs.expo.dev/versions/latest/sdk/camera/#scanningoptions)` |

  

### `onModernBarcodeScanned(listener)`[](https://docs.expo.dev/versions/latest/sdk/camera/#onmodernbarcodescannedlistener)

| Parameter | Type | Description |
| --- | --- | --- |
| listener | `(event: [ScanningResult](https://docs.expo.dev/versions/latest/sdk/camera/#scanningresult)) => void` | Invoked with the [ScanningResult](https://docs.expo.dev/versions/latest/sdk/camera/#scanningresult) when a bar code has been successfully scanned.
 |

  

Invokes the `listener` function when a bar code has been successfully scanned. The callback is provided with an object of the `ScanningResult` shape, where the `type` refers to the bar code type that was scanned and the `data` is the information encoded in the bar code (in this case of QR codes, this is often a URL). See [`BarcodeType`](https://docs.expo.dev/versions/latest/sdk/camera/#barcodetype) for supported values.

Component Methods[](https://docs.expo.dev/versions/latest/sdk/camera/#component-methods)
----------------------------------------------------------------------------------------

### `getAvailablePictureSizesAsync()`[](https://docs.expo.dev/versions/latest/sdk/camera/#getavailablepicturesizesasync)

Get picture sizes that are supported by the device.

Returns a Promise that resolves to an array of strings representing picture sizes that can be passed to `pictureSize` prop. The list varies across Android devices but is the same for every iOS.

### `pausePreview()`[](https://docs.expo.dev/versions/latest/sdk/camera/#pausepreview)

Pauses the camera preview. It is not recommended to use `takePictureAsync` when preview is paused.

### `recordAsync(options)`[](https://docs.expo.dev/versions/latest/sdk/camera/#recordasyncoptions)

| Parameter | Type | Description |
| --- | --- | --- |
| options(optional) | `[CameraRecordingOptions](https://docs.expo.dev/versions/latest/sdk/camera/#camerarecordingoptions)` | A map of `CameraRecordingOptions` type.
 |

  

Starts recording a video that will be saved to cache directory. Videos are rotated to match device's orientation. Flipping camera during a recording results in stopping it.

```
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<undefined | {
  uri: string
}>
```

Returns a Promise that resolves to an object containing video file `uri` property and a `codec` property on iOS. The Promise is returned if `stopRecording` was invoked, one of `maxDuration` and `maxFileSize` is reached or camera preview is stopped.

### `resumePreview()`[](https://docs.expo.dev/versions/latest/sdk/camera/#resumepreview)

Resumes the camera preview.

### `stopRecording()`[](https://docs.expo.dev/versions/latest/sdk/camera/#stoprecording)

Stops recording if any is in progress.

### `takePictureAsync(options)`[](https://docs.expo.dev/versions/latest/sdk/camera/#takepictureasyncoptions)

| Parameter | Type | Description |
| --- | --- | --- |
| options(optional) | `[CameraPictureOptions](https://docs.expo.dev/versions/latest/sdk/camera/#camerapictureoptions)` | An object in form of `CameraPictureOptions` type.
 |

  

Takes a picture and saves it to app's cache directory. Photos are rotated to match device's orientation (if `options.skipProcessing` flag is not enabled) and scaled to match the preview.

> Note: Make sure to wait for the [`onCameraReady`](https://docs.expo.dev/versions/latest/sdk/camera/#oncameraready) callback before calling this method.

Returns a Promise that resolves to `CameraCapturedPicture` object, where `uri` is a URI to the local image file on Android, iOS, and a base64 string on web (usable as the source for an `Image` element). The `width` and `height` properties specify the dimensions of the image.

`base64` is included if the `base64` option was truthy, and is a string containing the JPEG data of the image in Base64. Prepend it with `'data:image/jpg;base64,'` to get a data URI, which you can use as the source for an `Image` element for example.

`exif` is included if the `exif` option was truthy, and is an object containing EXIF data for the image. The names of its properties are EXIF tags and their values are the values for those tags.

> On native platforms, the local image URI is temporary. Use [`FileSystem.copyAsync`](https://docs.expo.dev/versions/latest/sdk/filesystem#filesystemcopyasyncoptions) to make a permanent copy of the image.

> Note: Avoid calling this method while the preview is paused. On Android, this will throw an error. On iOS, this will take a picture of the last frame that is currently on screen.

Hooks[](https://docs.expo.dev/versions/latest/sdk/camera/#hooks)
----------------------------------------------------------------

### `useCameraPermissions(options)`[](https://docs.expo.dev/versions/latest/sdk/camera/#usecamerapermissionsoptions)

| Parameter | Type |
| --- | --- |
| options(optional) | `[PermissionHookOptions](https://docs.expo.dev/versions/latest/sdk/camera/#permissionhookoptions)<object>` |

  

Check or request permissions to access the camera. This uses both `requestCameraPermissionsAsync` and `getCameraPermissionsAsync` to interact with the permissions.

`[null | [PermissionResponse](https://docs.expo.dev/versions/latest/sdk/camera/#permissionresponse), RequestPermissionMethod<[PermissionResponse](https://docs.expo.dev/versions/latest/sdk/camera/#permissionresponse)>, GetPermissionMethod<[PermissionResponse](https://docs.expo.dev/versions/latest/sdk/camera/#permissionresponse)>]`

Example

```
const [status, requestPermission] = useCameraPermissions();
```

### `useMicrophonePermissions(options)`[](https://docs.expo.dev/versions/latest/sdk/camera/#usemicrophonepermissionsoptions)

| Parameter | Type |
| --- | --- |
| options(optional) | `[PermissionHookOptions](https://docs.expo.dev/versions/latest/sdk/camera/#permissionhookoptions)<object>` |

  

Check or request permissions to access the microphone. This uses both `requestMicrophonePermissionsAsync` and `getMicrophonePermissionsAsync` to interact with the permissions.

`[null | [PermissionResponse](https://docs.expo.dev/versions/latest/sdk/camera/#permissionresponse), RequestPermissionMethod<[PermissionResponse](https://docs.expo.dev/versions/latest/sdk/camera/#permissionresponse)>, GetPermissionMethod<[PermissionResponse](https://docs.expo.dev/versions/latest/sdk/camera/#permissionresponse)>]`

Example

```
const [status, requestPermission] = Camera.useMicrophonePermissions();
```

Methods[](https://docs.expo.dev/versions/latest/sdk/camera/#methods)
--------------------------------------------------------------------

### `Camera.scanFromURLAsync(url, barcodeTypes)`[](https://docs.expo.dev/versions/latest/sdk/camera/#camerascanfromurlasyncurl-barcodetypes)

| Parameter | Type | Description |
| --- | --- | --- |
| url | `string` | URL to get the image from.
 |
| barcodeTypes(optional) | `[BarcodeType[]](https://docs.expo.dev/versions/latest/sdk/camera/#barcodetype)` | 

An array of bar code types. Defaults to all supported bar code types on the platform.

> Note: Only QR codes are supported on iOS. On android, the barcode should take up the majority of the image for best results.



 |

  

Scan bar codes from the image at the given URL.

A possibly empty array of objects of the `BarcodeScanningResult` shape, where the type refers to the barcode type that was scanned and the data is the information encoded in the barcode.

Interfaces[](https://docs.expo.dev/versions/latest/sdk/camera/#interfaces)
--------------------------------------------------------------------------

### `PermissionResponse`[](https://docs.expo.dev/versions/latest/sdk/camera/#permissionresponse)

An object obtained by permissions get and request functions.

| Property | Type | Description |
| --- | --- | --- |
| canAskAgain | `boolean` | Indicates if user can be asked again for specific permission. If not, one should be directed to the Settings app in order to enable/disable the permission.
 |
| expires | `[PermissionExpiration](https://docs.expo.dev/versions/latest/sdk/camera/#permissionexpiration)` | Determines time when the permission expires.

 |
| granted | `boolean` | A convenience boolean that indicates if the permission is granted.

 |
| status | `[PermissionStatus](https://docs.expo.dev/versions/latest/sdk/camera/#permissionstatus)` | Determines the status of the permission.

 |

Types[](https://docs.expo.dev/versions/latest/sdk/camera/#types)
----------------------------------------------------------------

### `BarcodeBounds`[](https://docs.expo.dev/versions/latest/sdk/camera/#barcodebounds)

| Property | Type | Description |
| --- | --- | --- |
| origin | `[BarcodePoint](https://docs.expo.dev/versions/latest/sdk/camera/#barcodepoint)` | The origin point of the bounding box.
 |
| size | `[BarcodeSize](https://docs.expo.dev/versions/latest/sdk/camera/#barcodesize)` | The size of the bounding box.

 |

### `BarcodePoint`[](https://docs.expo.dev/versions/latest/sdk/camera/#barcodepoint)

Type: `[Point](https://docs.expo.dev/versions/latest/sdk/camera/#point)`

These coordinates are represented in the coordinate space of the camera source (e.g. when you are using the camera view, these values are adjusted to the dimensions of the view).

### `BarcodeScanningResult`[](https://docs.expo.dev/versions/latest/sdk/camera/#barcodescanningresult)

| Property | Type | Description |
| --- | --- | --- |
| bounds | `[BarcodeBounds](https://docs.expo.dev/versions/latest/sdk/camera/#barcodebounds)` | The [`BarcodeBounds`](https://docs.expo.dev/versions/latest/sdk/camera/#barcodebounds) object. `bounds` in some case will be representing an empty rectangle. Moreover, `bounds` doesn't have to bound the whole barcode. For some types, they will represent the area used by the scanner.
 |
| cornerPoints | `[BarcodePoint[]](https://docs.expo.dev/versions/latest/sdk/camera/#barcodepoint)` | Corner points of the bounding box. `cornerPoints` is not always available and may be empty. On iOS, for `code39` and `pdf417` you don't get this value.

 |
| data | `string` | The parsed information encoded in the barcode.

 |
| type | `string` | The barcode type.

 |

### `BarcodeSettings`[](https://docs.expo.dev/versions/latest/sdk/camera/#barcodesettings)

| Property | Type | Description |
| --- | --- | --- |
| barcodeTypes | `[BarcodeType[]](https://docs.expo.dev/versions/latest/sdk/camera/#barcodetype)` | \- |

### `BarcodeSize`[](https://docs.expo.dev/versions/latest/sdk/camera/#barcodesize)

| Property | Type | Description |
| --- | --- | --- |
| height | `number` | The height value.
 |
| width | `number` | The width value.

 |

### `BarcodeType`[](https://docs.expo.dev/versions/latest/sdk/camera/#barcodetype)

Literal Type: `string`

The available barcode types that can be scanned.

Acceptable values are: `'aztec'` | `'ean13'` | `'ean8'` | `'qr'` | `'pdf417'` | `'upc_e'` | `'datamatrix'` | `'code39'` | `'code93'` | `'itf14'` | `'codabar'` | `'code128'` | `'upc_a'`

### `CameraCapturedPicture`[](https://docs.expo.dev/versions/latest/sdk/camera/#cameracapturedpicture)

| Property | Type | Description |
| --- | --- | --- |
| base64(optional) | `string` | A Base64 representation of the image.
 |
| exif(optional) | `[Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)<[MediaTrackSettings](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings)> | any` | On Android and iOS this object may include various fields based on the device and operating system. On web, it is a partial representation of the [`MediaTrackSettings`](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings) dictionary.

 |
| height | `number` | Captured image height.

 |
| uri | `string` | On web, the value of `uri` is the same as `base64` because file system URLs are not supported in the browser.

 |
| width | `number` | Captured image width.

 |

### `CameraMode`[](https://docs.expo.dev/versions/latest/sdk/camera/#cameramode)

Literal Type: `string`

Acceptable values are: `'picture'` | `'video'`

### `CameraMountError`[](https://docs.expo.dev/versions/latest/sdk/camera/#cameramounterror)

| Property | Type | Description |
| --- | --- | --- |
| message | `string` | \- |

### `CameraOrientation`[](https://docs.expo.dev/versions/latest/sdk/camera/#cameraorientation)

Literal Type: `string`

Acceptable values are: `'portrait'` | `'portraitUpsideDown'` | `'landscapeLeft'` | `'landscapeRight'`

### `CameraPictureOptions`[](https://docs.expo.dev/versions/latest/sdk/camera/#camerapictureoptions)

| Property | Type | Description |
| --- | --- | --- |
| additionalExif(optional) | `Record<string, any>` | 
Only for: 

Android

iOS

Additional EXIF data to be included for the image. Only useful when `exif` option is set to `true`.



 |
| base64(optional) | `boolean` | Whether to also include the image data in Base64 format.

 |
| exif(optional) | `boolean` | Whether to also include the EXIF data for the image.

 |
| imageType(optional) | `[ImageType](https://docs.expo.dev/versions/latest/sdk/camera/#imagetype)` | \- |
| isImageMirror(optional) | `boolean` | \- |
| mirror(optional) | `boolean` | 

> Deprecated Use `mirror` prop on `CameraView` instead.

Android

iOS

When set to `true`, the output image will be flipped along the vertical axis when using the front camera.

Default:`false`



 |
| onPictureSaved(optional) | `(picture: [CameraCapturedPicture](https://docs.expo.dev/versions/latest/sdk/camera/#cameracapturedpicture)) => void` | A callback invoked when picture is saved. If set, the promise of this method will resolve immediately with no data after picture is captured. The data that it should contain will be passed to this callback. If displaying or processing a captured photo right after taking it is not your case, this callback lets you skip waiting for it to be saved.

`picture: [CameraCapturedPicture](https://docs.expo.dev/versions/latest/sdk/camera/#cameracapturedpicture)`



 |
| quality(optional) | `number` | Specify the compression quality from `0` to `1`. `0` means compress for small size, and `1` means compress for maximum quality.

 |
| scale(optional) | `number` | \- |
| shutterSound(optional) | `boolean` | 

To programmatically disable the camera shutter sound

Default:`true`



 |
| skipProcessing(optional) | `boolean` | 

If set to `true`, camera skips orientation adjustment and returns an image straight from the device's camera. If enabled, `quality` option is discarded (processing pipeline is skipped as a whole). Although enabling this option reduces image delivery time significantly, it may cause the image to appear in a wrong orientation in the `Image` component (at the time of writing, it does not respect EXIF orientation of the images).

> Note: Enabling `skipProcessing` would cause orientation uncertainty. `Image` component does not respect EXIF stored orientation information, that means obtained image would be displayed wrongly (rotated by 90°, 180° or 270°). Different devices provide different orientations. For example some Sony Xperia or Samsung devices don't provide correctly oriented images by default. To always obtain correctly oriented image disable `skipProcessing` option.



 |

### `CameraRatio`[](https://docs.expo.dev/versions/latest/sdk/camera/#cameraratio)

Literal Type: `string`

Acceptable values are: `'4:3'` | `'16:9'` | `'1:1'`

### `CameraRecordingOptions`[](https://docs.expo.dev/versions/latest/sdk/camera/#camerarecordingoptions)

| Property | Type | Description |
| --- | --- | --- |
| codec(optional) | `[VideoCodec](https://docs.expo.dev/versions/latest/sdk/camera/#videocodec)` | 
Only for: 

iOS

This option specifies what codec to use when recording the video. See [`VideoCodec`](https://docs.expo.dev/versions/latest/sdk/camera/#videocodec) for the possible values.



 |
| maxDuration(optional) | `number` | Maximum video duration in seconds.

 |
| maxFileSize(optional) | `number` | Maximum video file size in bytes.

 |
| mirror(optional) | `boolean` | 

> Deprecated Use `mirror` prop on `CameraView` instead.

If `true`, the recorded video will be flipped along the vertical axis. iOS flips videos recorded with the front camera by default, but you can reverse that back by setting this to `true`. On Android, this is handled in the user's device settings.

 |

### `CameraType`[](https://docs.expo.dev/versions/latest/sdk/camera/#cameratype)

Literal Type: `string`

Acceptable values are: `'front'` | `'back'`

### `FlashMode`[](https://docs.expo.dev/versions/latest/sdk/camera/#flashmode)

Literal Type: `string`

Acceptable values are: `'off'` | `'on'` | `'auto'`

### `FocusMode`[](https://docs.expo.dev/versions/latest/sdk/camera/#focusmode)

Literal Type: `string`

This option specifies the mode of focus on the device.

*   `on` - Indicates that the device should autofocus once and then lock the focus.
*   `off` - Indicates that the device should automatically focus when needed.

Acceptable values are: `'on'` | `'off'`

### `ImageType`[](https://docs.expo.dev/versions/latest/sdk/camera/#imagetype)

Literal Type: `string`

Acceptable values are: `'png'` | `'jpg'`

### `PermissionExpiration`[](https://docs.expo.dev/versions/latest/sdk/camera/#permissionexpiration)

Literal Type: multiple types

Permission expiration time. Currently, all permissions are granted permanently.

Acceptable values are: `'never'` | `number`

### `PermissionHookOptions`[](https://docs.expo.dev/versions/latest/sdk/camera/#permissionhookoptions)

Literal Type: multiple types

Acceptable values are: `PermissionHookBehavior` | `Options`

### `Point`[](https://docs.expo.dev/versions/latest/sdk/camera/#point)

| Property | Type | Description |
| --- | --- | --- |
| x | `number` | \- |
| y | `number` | \- |

### `ResponsiveOrientationChanged`[](https://docs.expo.dev/versions/latest/sdk/camera/#responsiveorientationchanged)

| Property | Type | Description |
| --- | --- | --- |
| orientation | `[CameraOrientation](https://docs.expo.dev/versions/latest/sdk/camera/#cameraorientation)` | \- |

### `ScanningOptions`[](https://docs.expo.dev/versions/latest/sdk/camera/#scanningoptions)

| Property | Type | Description |
| --- | --- | --- |
| barcodeTypes | `[BarcodeType[]](https://docs.expo.dev/versions/latest/sdk/camera/#barcodetype)` | The type of codes to scan for.
 |
| isGuidanceEnabled(optional) | `boolean` | 

Guidance text, such as “Slow Down,” appears over the live video.

Default:`true`



 |
| isHighlightingEnabled(optional) | `boolean` | 

Indicates whether the scanner displays highlights around recognized items.

Default:`false`



 |
| isPinchToZoomEnabled(optional) | `boolean` | 

Indicates whether people can use a two-finger pinch-to-zoom gesture.

Default:`true`



 |

### `ScanningResult`[](https://docs.expo.dev/versions/latest/sdk/camera/#scanningresult)

Type: `[Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)<[BarcodeScanningResult](https://docs.expo.dev/versions/latest/sdk/camera/#barcodescanningresult), 'bounds'>`

### `Subscription`[](https://docs.expo.dev/versions/latest/sdk/camera/#subscription)

A subscription object that allows to conveniently remove an event listener from the emitter.

| Property | Type | Description |
| --- | --- | --- |
| remove | `() => void` | Removes an event listener for which the subscription has been created. After calling this function, the listener will no longer receive any events from the emitter.
 |

### `VideoCodec`[](https://docs.expo.dev/versions/latest/sdk/camera/#videocodec)

Literal Type: `string`

This option specifies what codec to use when recording a video.

Acceptable values are: `'avc1'` | `'hvc1'` | `'jpeg'` | `'apcn'` | `'ap4h'`

### `VideoQuality`[](https://docs.expo.dev/versions/latest/sdk/camera/#videoquality-1)

Literal Type: `string`

Acceptable values are: `'2160p'` | `'1080p'` | `'720p'` | `'480p'` | `'4:3'`

### `VideoStabilization`[](https://docs.expo.dev/versions/latest/sdk/camera/#videostabilization)

Literal Type: `string`

This option specifies the stabilization mode to use when recording a video.

Acceptable values are: `'off'` | `'standard'` | `'cinematic'` | `'auto'`

Enums[](https://docs.expo.dev/versions/latest/sdk/camera/#enums)
----------------------------------------------------------------

### `PermissionStatus`[](https://docs.expo.dev/versions/latest/sdk/camera/#permissionstatus)

#### `DENIED`[](https://docs.expo.dev/versions/latest/sdk/camera/#denied)

`PermissionStatus.DENIED ＝ "denied"`

User has denied the permission.

#### `GRANTED`[](https://docs.expo.dev/versions/latest/sdk/camera/#granted)

`PermissionStatus.GRANTED ＝ "granted"`

User has granted the permission.

#### `UNDETERMINED`[](https://docs.expo.dev/versions/latest/sdk/camera/#undetermined)

`PermissionStatus.UNDETERMINED ＝ "undetermined"`

User hasn't granted or denied the permission yet.

Permissions[](https://docs.expo.dev/versions/latest/sdk/camera/#permissions)
----------------------------------------------------------------------------

### Android[](https://docs.expo.dev/versions/latest/sdk/camera/#android)

This package automatically adds the `CAMERA` permission to your app. If you want to record videos with audio, you have to include the `RECORD_AUDIO` in your app.json inside the [`expo.android.permissions`](https://docs.expo.dev/versions/latest/config/app#permissions) array.

| Android Permission | Description |
| --- | --- |
| `CAMERA`[](https://docs.expo.dev/versions/latest/sdk/camera/#permission-camera)
 | Required to be able to access the camera device.

 |
| `RECORD_AUDIO`[](https://docs.expo.dev/versions/latest/sdk/camera/#permission-record_audio)

 | Allows an application to record audio.

 |

### iOS[](https://docs.expo.dev/versions/latest/sdk/camera/#ios)

The following usage description keys are used by this library:

| Info.plist Key | Description |
| --- | --- |
| `NSCameraUsageDescription`[](https://docs.expo.dev/versions/latest/sdk/camera/#permission-nscamerausagedescription)
 | A message that tells the user why the app is requesting access to the device’s camera. |
| `NSMicrophoneUsageDescription`[](https://docs.expo.dev/versions/latest/sdk/camera/#permission-nsmicrophoneusagedescription)

 | A message that tells the user why the app is requesting access to the device’s microphone. |