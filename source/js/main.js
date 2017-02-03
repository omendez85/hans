import React from 'react'; // ES6
import ReactDOM from 'react-dom'; // ES6

var ButtonRemove = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.removeItem(this.props.indexItem);
  },
  render: function() {
    return (
        <button onClick={this.handleClick} className="btn btn-danger glyphicon glyphicon-remove" aria-hidden="true" title="Eliminar"></button>
      );
  }
});

var ButtonAddItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.addItem();
  },
  render: function() {
    return (
        <button onClick={this.handleClick} className="btn btn-primary glyphicon glyphicon-plus" aria-hidden="true"> Agregar Etiqueta</button>
      );
  }
});

var Item = React.createClass({
  mixins: [LinkedStateMixin],
  updateFieldValue: function(e) {
      this.props.updateItem(this.props.index, e.currentTarget );
  },
  render: function() {
    var removeBtn = <ButtonRemove removeItem={this.props.removeItem} indexItem={this.props.index} />
    console.log(this.props.item)

    var valueItemCode = this.linkState('itemCode');
    var handleChange = function(e) {
        valueLink.requestChange(e.target.value);
    };

    return (

        <li className="row show-grid" data-index={this.props.index}>
            <div className="col-sm-1">
                {removeBtn}
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.handleChange}
                    value={this.props.item.itemCode}
                    data-state-name="itemCode"
                    name={ "item-code-" + this.props.index } />
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.updateFieldValue}
                    value={this.props.item.itemSize}
                    data-state-name="itemSize"
                    name={ "item-size-" + this.props.index } />
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.updateFieldValue}
                    value={this.props.item.itemMaterial}
                    data-state-name="itemMaterial"
                    name={ "item-material-" + this.props.index } />
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.updateFieldValue}
                    value={this.props.item.itemForm}
                    data-state-name="itemForm"
                    name={ "item-form-" + this.props.index } />
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.updateFieldValue}
                    value={this.props.item.itemAmount}
                    data-state-name="itemAmount"
                    name={ "item-amount-" + this.props.index } />
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.updateFieldValue}
                    value={this.props.item.itemAmountBox}
                    data-state-name="itemAmountBox"
                    name={ "item-amount-box-" + this.props.index } />
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.updateFieldValue}
                    value={this.props.item.itemAmountRolls}
                    data-state-name="itemAmountRolls"
                    name={ "item-amount-rolls-" + this.props.index } />
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.updateFieldValue}
                    value={this.props.item.itemUnitsPerRoll}
                    data-state-name="itemUnitsPerRoll"
                    name={ "item-units-per-roll-" + this.props.index } />
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.updateFieldValue}
                    value={this.props.item.itemType}
                    data-state-name="itemType"
                    name={ "item-type-" + this.props.index } />
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.updateFieldValue}
                    value={this.props.item.itemCavity}
                    data-state-name="itemCavity"
                    name={ "item-cavity-" + this.props.index } />
            </div>
            <div className="col-sm-1">
                <input type="text"
                    onKeyUp={this.updateFieldValue}
                    value={this.props.item.itemAmountInk}
                    data-state-name="itemAmountInk"
                    name={ "item-amount-ink-" + this.props.index } />
            </div>
        </li>

      );
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {
      items: [ {
        id: 0,
        itemCode: '',
        itemSize: '',
        itemMaterial: '',
        itemForm: '',
        itemAmount: '',
        itemAmountBox: '',
        itemAmountRolls: '',
        itemUnitsPerRoll: '',
        itemType: '',
        itemCavity: '',
        itemAmountInk: ''
      } ],
      primaryId: 0
    }
  },
  addItem: function() {
    var nextId = this.state.primaryId + 1;
    var newItem = {
        id: nextId,
        itemCode: '',
        itemSize: '',
        itemMaterial: '',
        itemForm: '',
        itemAmount: '',
        itemAmountBox: '',
        itemAmountRolls: '',
        itemUnitsPerRoll: '',
        itemType: '',
        itemCavity: '',
        itemAmountInk: ''
    };

    this.setState( {
      items: this.state.items.concat( newItem ),
      primaryId: nextId
    });
  },

  removeItem: function(indexItem) {

    //FUNCIONA PERO NO ES OPTIMO
    //this.state.items[indexItem] = null;
    //this.setState( {items: this.state.items  } );

    this.state.items.splice(indexItem, 1);
    this.setState( {items: this.state.items  } );
  },

  updateItem: function(indexItem, input) {

      var item = this.state.items[indexItem];
      item[input.getAttribute('data-state-name')] = input.value;
      this.state.items[indexItem] = item;
      this.setState( { items:  this.state.items } );

  },
  render: function() {

    var that = this;
    var itemsList = this.state.items.map( function(item, i) {
      if( item !== null) {
        return <Item
                 updateItem={that.updateItem}
                 removeItem={that.removeItem}
                 item={item}
                 index={i}
                 key={i}
                />
      }
    });

    return (

        <div id="list-items">
          <h2>Lista Items</h2>

          <ul>
            <li>
              <ButtonAddItem addItem={this.addItem}/>
            </li>
            <li className="row show-grid">
              <div className="col-sm-1"></div>
              <div className="col-sm-1">Codigo Etiqueta</div>
              <div className="col-sm-1">Tamano Etiqueta</div>
              <div className="col-sm-1">Material</div>
              <div className="col-sm-1">Forma Troquel</div>
              <div className="col-sm-1">Cantidad Etiquetas</div>
              <div className="col-sm-1">Cantidad Cajas</div>
              <div className="col-sm-1">Cantidad Rollos</div>
              <div className="col-sm-1">Unidades por Rollo</div>
              <div className="col-sm-1">Tipo core</div>
              <div className="col-sm-1">Cavidad</div>
              <div className="col-sm-1">Cantidad tintas</div>
            </li>

            {itemsList}
          </ul>
        </div>
      );
  }
});


ReactDOM.render(
    <Main />,
    document.getElementById('items-container')
);
