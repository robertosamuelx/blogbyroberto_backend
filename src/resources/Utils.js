module.exports = {
    changeLink(value){
        let array = String(value).split('/');
        let suffix = array[array.length-1];
        return 'https://www.youtube.com/embed/'.concat(suffix);
    }
};