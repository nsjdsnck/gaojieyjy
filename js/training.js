document.addEventListener('DOMContentLoaded', function() {
    // 获取模态框元素
    var modal = document.getElementById('imageModal');
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    var modalImg = document.getElementById('modalImage');
    var captionText = document.getElementById('caption');
    var span = document.getElementsByClassName("close")[0];

    // 为所有可放大的图片添加点击事件
    document.querySelectorAll('.img-container img').forEach(img => {
        img.onclick = function(e) {
            e.preventDefault(); // 阻止默认行为
            e.stopPropagation(); // 阻止事件冒泡
            console.log('Image clicked'); // 调试日志
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
    });

    // 点击关闭按钮关闭模态框
    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    // 点击模态框外部关闭
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });

    // 添加产品卡片动画
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}); 