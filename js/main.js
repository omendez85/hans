"use strict";

var ButtonRemove = React.createClass({ displayName: "ButtonRemove",
    handleClick: function handleClick(e) {
        e.preventDefault();
        this.props.removeItem(this.props.indexItem);
    },
    render: function render() {
        return React.createElement("button", { onClick: this.handleClick, className: "btn btn-danger glyphicon glyphicon-remove", "aria-hidden": "true", title: "Eliminar" });
    }
});

var ButtonAddItem = React.createClass({ displayName: "ButtonAddItem",
    handleClick: function handleClick(e) {
        e.preventDefault();
        this.props.addItem();
    },
    render: function render() {
        return React.createElement("button", { onClick: this.handleClick, className: "btn btn-primary glyphicon glyphicon-plus", "aria-hidden": "true" }, " Agregar Etiqueta");
    }
});

var Item = React.createClass({ displayName: "Item",

    updateFieldValue: function updateFieldValue(e) {
        this.props.updateItem(this.props.index, e.currentTarget);
    },
    render: function render() {
        var removeBtn = React.createElement(ButtonRemove, { removeItem: this.props.removeItem, indexItem: this.props.index });
        console.log(this.props.item);
        var chango = this.props.item.itemCode;
        return React.createElement("li", { className: "row show-grid", "data-index": this.props.index }, React.createElement("div", { className: "col-sm-1" }, removeBtn), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemCode,
            "data-state-name": "itemCode",
            name: "item-code-" + this.props.index })), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemSize,
            "data-state-name": "itemSize",
            name: "item-size-" + this.props.index })), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemMaterial,
            "data-state-name": "itemMaterial",
            name: "item-material-" + this.props.index })), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemForm,
            "data-state-name": "itemForm",
            name: "item-form-" + this.props.index })), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemAmount,
            "data-state-name": "itemAmount",
            name: "item-amount-" + this.props.index })), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemAmountBox,
            "data-state-name": "itemAmountBox",
            name: "item-amount-box-" + this.props.index })), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemAmountRolls,
            "data-state-name": "itemAmountRolls",
            name: "item-amount-rolls-" + this.props.index })), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemUnitsPerRoll,
            "data-state-name": "itemUnitsPerRoll",
            name: "item-units-per-roll-" + this.props.index })), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemType,
            "data-state-name": "itemType",
            name: "item-type-" + this.props.index })), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemCavity,
            "data-state-name": "itemCavity",
            name: "item-cavity-" + this.props.index })), React.createElement("div", { className: "col-sm-1" }, React.createElement("input", { type: "text",
            onKeyUp: this.updateFieldValue,
            defaultValue: this.props.item.itemAmountInk,
            "data-state-name": "itemAmountInk",
            name: "item-amount-ink-" + this.props.index })));
    }
});

var Main = React.createClass({ displayName: "Main",
    getInitialState: function getInitialState() {
        return {
            items: [{
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
            }],
            primaryId: 0
        };
    },
    addItem: function addItem() {
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

        this.setState({
            items: this.state.items.concat(newItem),
            primaryId: nextId
        });
    },

    removeItem: function removeItem(indexItem) {

        //FUNCIONA PERO NO ES OPTIMO
        //this.state.items[indexItem] = null;
        //this.setState( {items: this.state.items  } );

        this.state.items.splice(indexItem, 1);
        this.setState({ items: this.state.items });
    },

    updateItem: function updateItem(indexItem, input) {

        var item = this.state.items[indexItem];
        item[input.getAttribute('data-state-name')] = input.value;
        this.state.items[indexItem] = item;
        this.setState({ items: this.state.items });
    },
    render: function render() {

        var that = this;
        var itemsList = this.state.items.map(function (item, i) {
            if (item !== null) {
                return React.createElement(Item, {
                    updateItem: that.updateItem,
                    removeItem: that.removeItem,
                    item: that.state.items[i],
                    index: i, key: i });
            }
        });

        return React.createElement("div", { id: "list-items" }, React.createElement("h2", null, "Lista Items"), React.createElement("ul", null, React.createElement("li", null, React.createElement(ButtonAddItem, { addItem: this.addItem })), React.createElement("li", { className: "row show-grid" }, React.createElement("div", { className: "col-sm-1" }), React.createElement("div", { className: "col-sm-1" }, "Codigo Etiqueta"), React.createElement("div", { className: "col-sm-1" }, "Tamano Etiqueta"), React.createElement("div", { className: "col-sm-1" }, "Material"), React.createElement("div", { className: "col-sm-1" }, "Forma Troquel"), React.createElement("div", { className: "col-sm-1" }, "Cantidad Etiquetas"), React.createElement("div", { className: "col-sm-1" }, "Cantidad Cajas"), React.createElement("div", { className: "col-sm-1" }, "Cantidad Rollos"), React.createElement("div", { className: "col-sm-1" }, "Unidades por Rollo"), React.createElement("div", { className: "col-sm-1" }, "Tipo core"), React.createElement("div", { className: "col-sm-1" }, "Cavidad"), React.createElement("div", { className: "col-sm-1" }, "Cantidad tintas")), itemsList));
    }
});

ReactDOM.render(React.createElement(Main, null), document.getElementById('items-container'));
//# sourceMappingURL=main.js.map
