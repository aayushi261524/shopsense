import React from 'react'
import './styles.css'

// ShopSense adds transparent budget guidance to the upstream comparison table.
class Compare extends React.Component {
  constructor(props) { super(props); this.state = { budget: '', condition: 'Any' }; }
  render() {
  const {products} = this.props;
  const priceOf = product => { const raw = String(product.price).replace(/[^0-9.]/g, ''); return raw && Number.isFinite(Number(raw)) ? Number(raw) : null; };
  const budget = this.state.budget === '' ? null : Number(this.state.budget);
  const matches = product => (budget === null || (priceOf(product) !== null && priceOf(product) <= budget)) && (this.state.condition === 'Any' || product.condition === this.state.condition);
  const eligible = products.filter(matches).filter(product => priceOf(product) !== null);
  const lowest = eligible.length ? Math.min(...eligible.map(priceOf)) : null;
  return (
  <div className="row compare">
    <div className="col-12 mt-5 text-center">
      <section style={{textAlign:'left',padding:24,background:'#f1f6ef',borderRadius:16,marginBottom:24}} aria-label="ShopSense decision guide">
        <p style={{letterSpacing:2,fontSize:12}}>SHOPSENSE · OPEN-SOURCE ADAPTATION</p>
        <h2>Compare with your needs in mind.</h2>
        <p>Select groceries above, then compare their illustrative prices, colours and condition. No real checkout or live inventory.</p>
        <label style={{display:'block',marginBottom:16}}>Maximum price per item (same currency as the catalogue)
          <input type="number" min="0" step="0.01" value={this.state.budget} onChange={event => this.setState({budget:event.target.value})} style={{display:'block',fontSize:16,padding:10,maxWidth:'100%'}} placeholder="No limit" />
        </label>
        <label>Preferred condition <select value={this.state.condition} onChange={event => this.setState({condition:event.target.value})} style={{fontSize:16,padding:10}}><option>Any</option><option>Fresh</option><option>Frozen</option></select></label>
        <p aria-live="polite">{products.length === 0 ? 'Choose at least two products above to start a comparison.' : eligible.length === 0 ? 'None of your selected products match these needs. Adjust your selection or budget.' : eligible.length + ' selected products match. Lowest matching listed price: ' + lowest + '.'}</p>
        <p style={{fontSize:14}}>The guide uses only listed price and condition. Pack size, delivery, availability and quality are not assessed; the cheapest item is not automatically the best value.</p>
        <p style={{fontSize:14}}>Comparison table and catalogue: <a href="https://github.com/Rhymond/product-compare-react" target="_blank" rel="noopener noreferrer">Rhymond’s MIT-licensed project</a>. Budget and condition guidance added for Aayushi’s portfolio.</p>
      </section>
      <div style={{overflowX:'auto'}}><table className="table">
        <caption>Illustrative selected-product comparison</caption>
        <thead className="thead-default">
          <tr>
            <th />
            {products.map(product =>
              <th key={product.id}>
                {product.name}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="price">
            <th scope="row">Price</th>
            {products.map(product =>
              <td key={product.id} className="text-center">{product.price}</td>
            )}
          </tr>
          <tr className="colors">
            <th scope="row">Colors</th>
            {products.map(product =>
              <td key={product.id}>
                {product.colors.map((color, index) =>
                  <span key={index} className={"bg-" + color} />
                )}
              </td>
            )}
          </tr>
          <tr className="condition">
            <th scope="row">Condition</th>
            {products.map(product =>
              <td key={product.id} className={product.condition === "Frozen" ? "bg-red" : "bg-green"}>
                {product.condition}
              </td>
            )}
          </tr>
        <tr><th scope="row">Fit to your needs</th>{products.map(product => <td key={product.id}>{!matches(product) ? 'Outside your requirements' : priceOf(product) === lowest ? 'Lowest matching listed price' : 'Matches your requirements'}</td>)}</tr>
        </tbody>
      </table></div>
    </div>
  </div>);
  }
}

export default Compare
