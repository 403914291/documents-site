import path from "node:path";
import fs from "node:fs";

// 鏂囦欢鏍圭洰褰?const DIR_PATH = path.resolve();
// 鐧藉悕鍗曪紝杩囨护涓嶆槸鏂囩珷鐨勬枃浠跺拰鏂囦欢澶?const WHITE_LIST = [
  "index.md",
  ".vitepress",
  "node_modules",
  ".idea",
  "assets",
];

// 鍒ゆ柇鏄惁鏄枃浠跺す
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

// 鍙栧樊闆?const intersections = (arr1, arr2) =>
  Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 鎶婃柟娉曞鍑虹洿鎺ヤ娇鐢?function getList(params, path1, pathname) {
  // 瀛樻斁缁撴灉
  const res = [];
  // 寮€濮嬮亶鍘?params
  for (let file in params) {
    // 鎷兼帴鐩綍
    const dir = path.join(path1, params[file]);
    // 鍒ゆ柇鏄惁鏄枃浠跺す
    const isDir = isDirectory(dir);
    if (isDir) {
      // 濡傛灉鏄枃浠跺す锛岃鍙栦箣鍚庝綔涓轰笅涓€娆￠€掑綊鍙傛暟
      const files = fs.readdirSync(dir);
      res.push({
        text: params[file],
        collapsible: true, // 鏄剧ず涓€涓垏鎹㈡寜閽潵闅愯棌/鏄剧ず姣忎釜閮ㄥ垎
        items: getList(files, dir, `${pathname}/${params[file]}`),
      });
    } else {
      // 鑾峰彇鍚嶅瓧
      const name = path.basename(params[file]);
      // 鎺掗櫎涓嶆槸 md 鏂囦欢
      const suffix = path.extname(params[file]);
      if (suffix !== ".md") {
        continue;
      }
      res.push({
        text: name,
        link: `${pathname}/${name}`,
      });
    }
  }
  // 瀵?name 鍋氫竴涓嬪鐞嗭紝鎶婂悗缂€鍒犻櫎
  return res.map((item) => ({
    ...item,
    text: item.text.replace(/\.md$/, ""),
  }));
}

export const set_sidebar = (pathname) => {
  // 鑾峰彇 pathname 鐨勮矾寰?  const dirPath = path.join(DIR_PATH, pathname);
  // 璇诲彇 pathname 涓嬬殑鎵€鏈夋枃浠舵垨鑰呮枃浠跺す
  const files = fs.readdirSync(dirPath);
  // 杩囨护鐧藉悕鍗?  const items = intersections(files, WHITE_LIST);
  // getList 鍑芥暟鍚庨潰浼氳鍒?  return getList(items, dirPath, pathname);
};
