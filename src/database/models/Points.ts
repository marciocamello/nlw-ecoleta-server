import Model from './Model'
import knex from '.././connection'

class Points extends Model {
  async items (id) {
    return await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')
  }

  async filteredPoints (parsedItems: any, city: any, uf: any) {
    return await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')
  }
}

export default new Points('points')
