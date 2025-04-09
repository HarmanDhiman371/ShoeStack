const db = require('./config/userconfigs');

const products = [
  ["Nike Air Max 90", "Nike", "7,8,9", "Black", "male", 5999, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTbm2jQVFt0R4MUdFeS7w-T-RZGF7b9AKiIYfqTzV17Bd57kTQWUPeXxpd06QjV33wZC0b7xQqCm2NYFueLagFjl4PLBDGemOpVTBNFWuirJTmSHwoytsEb"],
  ["Adidas Ultraboost", "Adidas", "6,7,8,9", "White", "female", 7499, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ8iO0F_lU99IstbMDaTIbeRyjUH4E2t7RL5EOsacHGLBwmd_uvSemb8HlLa658ZOsz4OqGeY782EBT_SWvvkhS-KyjsOyxxY4liJNE3L-0J5cplmIc7x3yPW1gUX8VnMr_RAiIuys&usqp=CAc"],
  ["Puma RS-X", "Puma", "7,8,9,10", "Black", "unisex", 4999, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcStA6R79EX0QjIxEMhg2cU9DNuLd5PhnXxvPi-lsaB9SloHqcvjXlWAbKD--hFZKCyJc9xqJ1Co7vE-Hm_QV-2iMLF62RzpcSt4n1F3DVitW7YD4HWm9E3y8Fk"],
  ["Reebok Classic", "Reebok", "6,7,8", "White", "female", 3999, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRJmt0qdBQH8OJ4T3zCClxgTtYVvB4yU4y52iLS6qPcXMv_auhH2OnrVAOF9an0oWD0aijS3UV4wgrgP5RnKPLdnSiR2RyiNDU5oyBWre1oNt79LvCbzS0EH0-4pwCCMCYs8AmQiQ&usqp=CAc"],
  ["Skechers Go Walk", "Skechers", "5,6,7", "Grey", "female", 2999, "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTaiyMji5KWdYpv5ur1VT8o_-Pz22_zyitd71wOoqST8s3etaWmSIX8G3n4DiTYlINl1f1iIYpfxxezdT7fjVcM-VmYS23YeGCmwDIhxHBFcOR8mWLfSPqY"],
  ["Nike Revolution 6", "Nike", "6,7,8,9,10", "lBlue", "female", 4299, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTX1qyGhmQYMS_juKIy50YV0t6SvaMYYA6drXs3MdMPzifhJSwlZrA5ZXFwE89VYIV-WnJKbjZEt9AUjahg80BRGCGbajbtjCvN2s29o5yLfVTa2-NrsDPX4EBL_gciNd9GJoc8NznV&usqp=CAc"],
  ["Adidas Gazelle", "Adidas", "6,7,8", "Blue", "unisex", 5299, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRhoHpKX6LA6fD7feUhvtxnX-O8Q6kiQaTAUJK-P1Zf6wRxBhxSrPItQoNiwYWFVNmJdgI_KZ2BZ4ew1rP0vQEFxSNmEXqC-Zx1Lk7KTqYGOMQSZehCtwfs"],
  ["Puma Smash", "Puma", "7,8,9", "White", "male", 3499, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTMQpA9p9BTgQEKseV9kHaR-e8QAZ32sPbSKDo9QsxNUD4W0djpRPCwddRMzhMMDd0XSKf_RhmMDjAEHqeso9_9oC4nEwhTaz1MFCmba-fa6AAM2-KeS28qog"],
  ["Reebok Zig", "Reebok", "8,9", "Cream", "female", 4799, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTRSCgBpeXUdvWKpRX3ks7sQiBcchU-5T1L9pSv8wq7xuiOnuMPEafMBI_Fa3EzmsbN-lMibgiYVK1NyboQbg_wHa0DH6Nq44o9WeCZiRSMHgNxXliiZn_P"],
  ["Skechers D'Lites", "Skechers", "6,7,8", "Purple", "female", 3799, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQE7NdTBa5e7bXIsM9IG9XNyUEm4BqYFlswrRTMdIe1cCsMDiaEgTFyTdRVmE9Qxqz0xE45fsUSF0UXxHHPYjYBNNqaJRpP7EXtcKh85lAdQ8VQXDpMODwcbw"]
];

const insertQuery = `
  INSERT INTO products (name, brand, sizeOptions, color, gender, price, imageUrl)
  VALUES ?
`;

db.query(insertQuery, [products], (err, result) => {
  if (err) throw err;
  console.log(`${result.affectedRows} products inserted successfully!`);
  db.end();
});
