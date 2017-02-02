/* eslint-disable camelcase */
export default {
  forEach: function Object_forEach (object, callback) {
    for (let key in object) {
      if (object.hasOwnProperty(key)) callback(object[key], key)
    }
  }
}
