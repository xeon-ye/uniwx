/**
 * toast
 */
export const toast = (title = '', param = {}) => {
        if (!title) return;
        uni.showToast({
            title,
            duration: param.duration || 1500,
            mask: param.mask || false,
            icon: param.icon || 'none'
        });
    }
    /**
     * alter
     */
export const alter = (param = {}) => {
    uni.showModal({
        title: param.title || '提示',
        content: param.content || '这是一个模态弹窗',
        showCancel: param.showCancel || false,
        cancelText: param.cancelText || '取消',
        cancelColor: param.cancelColor || '#000000',
        confirmColor: param.confirmColor || '#000000',
        confirmText: param.confirmText || '确定',
        success: function(res) {
            if (res.confirm) {
                console.log('用户点击确定');
                param.success();
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    });
}