// scripts/drp-core.js

/**
 * Dynamic Receipt Passport (DRP) core logic.
 * 購入レコードとパスポート状態を扱う純粋なヘルパーです。
 * XRPL へのアクセスは一切行いません。
 */

/**
 * 購入レコードの型イメージ:
 *
 * {
 *   id: string
 *   storeName: string
 *   storeId?: string
 *   city?: string
 *   amount: number
 *   currency: string
 *   vatRate?: number
 *   vatAmount?: number
 *   timestamp: string
 *   category?: string
 * }
 */

export function createEmptyPassport(ownerWallet, favoriteCity = null) {
  return {
    ownerWallet,
    totalPurchases: 0,
    totalAmount: 0,
    totalVAT: 0,
    visitedStores: [],   // storeId のリスト
    visitedCities: [],   // city のリスト
    stamps: {},          // storeId -> 来店回数
    favoriteCity,
    level: 1
  }
}

/**
 * パスポートに新しい購入レコードを追加し、
 * 合計値やスタンプ、レベルを更新した新しいオブジェクトを返します。
 */
export function addPurchaseToPassport(passport, purchase) {
  const next = {
    ...passport,
    // オブジェクトをコピーしてから配列もコピーする
    visitedStores: [...passport.visitedStores],
    visitedCities: [...passport.visitedCities],
    stamps: { ...passport.stamps }
  }

  next.totalPurchases += 1
  next.totalAmount += purchase.amount || 0
  next.totalVAT += purchase.vatAmount || 0

  // 訪問店舗
  if (purchase.storeId && !next.visitedStores.includes(purchase.storeId)) {
    next.visitedStores.push(purchase.storeId)
  }

  // 訪問都市
  if (purchase.city && !next.visitedCities.includes(purchase.city)) {
    next.visitedCities.push(purchase.city)
  }

  // スタンプ加算
  if (purchase.storeId) {
    const prev = next.stamps[purchase.storeId] || 0
    next.stamps[purchase.storeId] = prev + 1
  }

  // favoriteCity が未設定なら、最初に訪れた city をセット
  if (!next.favoriteCity && next.visitedCities.length > 0) {
    next.favoriteCity = next.visitedCities[0]
  }

  // レベル再計算
  next.level = computeLevel(next)

  return next
}

/**
 * 合計件数や都市数から NFT のレベルを決める簡易ロジック。
 * 本番ではもっとリッチに拡張できます。
 */
export function computeLevel(passport) {
  const { totalPurchases, visitedCities } = passport
  let level = 1

  if (totalPurchases >= 10) level = 2
  if (totalPurchases >= 30) level = 3
  if (totalPurchases >= 60) level = 4
  if (totalPurchases >= 100) level = 5

  // 3都市以上訪れていたら +1 レベル（最大 5）
  if (visitedCities.length >= 3 && level < 5) {
    level += 1
  }

  return level
}