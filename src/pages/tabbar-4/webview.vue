<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="src"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF6C00'
                    }
                },
				src:""
            }
        },
		onLoad(e) {
			this.src = e.src;
		}
    }
</script>

<style>
</style>
