export const CalculateDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return "Şimdi";
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} dakika önce`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} saat önce`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} gün önce`;
    }

    return date.toLocaleDateString('tr-TR');
}
