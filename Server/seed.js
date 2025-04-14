const db = require('./config/userconfigs');

const products = [
  ["Nike Air Max 90", "Nike", "7,8,9", "White", "male", 5999, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTbm2jQVFt0R4MUdFeS7w-T-RZGF7b9AKiIYfqTzV17Bd57kTQWUPeXxpd06QjV33wZC0b7xQqCm2NYFueLagFjl4PLBDGemOpVTBNFWuirJTmSHwoytsEb", "Sneakers"],
  ["Adidas Ultraboost", "Adidas", "6,7,8,9", "Black", "female", 7499, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ8iO0F_lU99IstbMDaTIbeRyjUH4E2t7RL5EOsacHGLBwmd_uvSemb8HlLa658ZOsz4OqGeY782EBT_SWvvkhS-KyjsOyxxY4liJNE3L-0J5cplmIc7x3yPW1gUX8VnMr_RAiIuys&usqp=CAc", "Sneakers"],
  ["Puma RS-X", "Puma", "7,8,9,10", "White", "unisex", 4999, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcStA6R79EX0QjIxEMhg2cU9DNuLd5PhnXxvPi-lsaB9SloHqcvjXlWAbKD--hFZKCyJc9xqJ1Co7vE-Hm_QV-2iMLF62RzpcSt4n1F3DVitW7YD4HWm9E3y8Fk", "Sneakers"],
  ["Reebok Classic", "Reebok", "6,7,8", "Cream", "female", 3999, "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRvO67Da_8CcsW0EAUAUFHLhotL1PtAnQxMo7fQiHBkfbFY5-lwWcjVR8WNL4zcuJxdZwoOHcWgmH0AIjuZ0JsYdQVE9y6MBmICqpysDFy-4kF_tWGymtun5zK7JGQjxQln3X9Xqw&usqp=CAc", "Sneakers"],
  ["Skechers Go Walk", "Skechers", "5,6,7", "Blue", "female", 2999, "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTaiyMji5KWdYpv5ur1VT8o_-Pz22_zyitd71wOoqST8s3etaWmSIX8G3n4DiTYlINl1f1iIYpfxxezdT7fjVcM-VmYS23YeGCmwDIhxHBFcOR8mWLfSPqY","Sports Shoes"],
  ["Nike Revolution 6", "Nike", "6,7,8,9,10", "Blue", "female", 4299, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTX1qyGhmQYMS_juKIy50YV0t6SvaMYYA6drXs3MdMPzifhJSwlZrA5ZXFwE89VYIV-WnJKbjZEt9AUjahg80BRGCGbajbtjCvN2s29o5yLfVTa2-NrsDPX4EBL_gciNd9GJoc8NznV&usqp=CAc", "Sports Shoes"],
  ["Adidas Gazelle", "Adidas", "6,7,8", "Blue", "unisex", 5299, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTTu18LjeE-rKYem4PQBrqP8lqJ2nvAPHh9Y1RDTBrLiIsAuuBB6DFgbD5u8aP5tc_gkITLUTHPpG56Saq5f9LfyC16uuM8qmx_mzd1U8F5nLKMdaRPt9Pu&usqp=CAc", "Sneakers"],
  ["Puma Smash", "Puma", "7,8,9", "White", "male", 3499, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTMQpA9p9BTgQEKseV9kHaR-e8QAZ32sPbSKDo9QsxNUD4W0djpRPCwddRMzhMMDd0XSKf_RhmMDjAEHqeso9_9oC4nEwhTaz1MFCmba-fa6AAM2-KeS28qog", "Sneakers"],
  ["Reebok Zig", "Reebok", "8,9", "Pink", "female", 4799, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTrbfFQhyqvqy286XMrh2VknpfDPawKiws9WgrlyQKJ76pwh7InCGiBkUu5loFO00960jvysL6dQyVEKQ7JhO367JCiZIGtxuFHuXXuHIClLx9x_qfQj8_6","Sneakers"],
  ["Skechers D'Lites", "Skechers", "6,7,8", "Purple", "female", 3799, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQE7NdTBa5e7bXIsM9IG9XNyUEm4BqYFlswrRTMdIe1cCsMDiaEgTFyTdRVmE9Qxqz0xE45fsUSF0UXxHHPYjYBNNqaJRpP7EXtcKh85lAdQ8VQXDpMODwcbw", "Sneakers"],
  //formal shoes
  ["Men's Formal Shoes", "Flying Hawk", "7,8,9,10,11", "Brown", "male", 9599, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQGFwIGIID31USXCQ1aqj08tOqhHvgyviXtrs8o629fnPEFzQkYzeDkw_qbZ0zbBXEwNlOHfOALcrosIABaElZ20WU61UBRfXOAWS6RBoioTVMJOzjNkLgozPQ", "Formal"],
  ["Clarks Derby Luxe", "Clarks", "7,8,9,10", "Black", "male", 7599, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEW5GAGMFsck5p6g3SJ4odwmPgqm-qcpD_OIz-oH2gabYlJ8R9CyVYOHE&s", "Formal"],
  ["Women Ava Lace Up Leather Derby", "Tommy Hilfiger", "6,7,8", "Black", "female", 9299, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEW5GAGMFsck5p6g3SJ4odwmPgqm-qcpD_OIz-oH2gabYlJ8R9CyVYOHE&s", "Formal"],

  //loafers
  ["Hush Puppies Loafer", "Hush Puppies", "6,7,8", "Tan", "female", 4599, "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/b/1b7f1f26543008Tan_1.jpg?rnd=20200526195200&tr=w-256", "Loafers"],
  ["Men's Caleo Revo ExKo Penny Black Loafers", "Bugatti", "9,10, 11", "Black", "male", 4599, "https://img.tatacliq.com/images/i16//658Wx734H/MP000000020915393_658Wx734H_202401242135131.jpeg", "Loafers"]
];

const insertQuery = `
  INSERT INTO products (name, brand, sizeOptions, color, gender, price, imageUrl, category)
  VALUES ?
`;

db.query(insertQuery, [products], (err, result) => {
  if (err) throw err;
  console.log(`${result.affectedRows} products inserted successfully!`);
  db.end();
});
