/**
 * @jsx React.DOM
 */

var TableSorter = React.createClass({
	getInitialState: function() {
		if(!this.props.items)
			throw ('props.items required');

		return {
			sortColumn: this.props.sortColumn || null,
			sortASC: this.props.sortASC || true,
			pageSize: this.props.pageSize || 25,
			currentPage: this.props.currentPage || 0,
			hiddenColumns: this.props.hiddenColumns || []
		};
	},
	changePageSize: function(e) {
		var ps = parseInt(e.currentTarget.value);

		this.setState({
			pageSize: ps,
			currentPage: 0 // Go back to the first page on page change
		});
	},
	changeSort: function(e) {
		var currentSort = this.state.sortColumn,
			newSort = e.currentTarget.getAttribute('data-sort-column'),
			obj = {sortColumn : newSort};

		if(currentSort === newSort)
			obj.sortASC = !this.state.sortASC

		this.setState(obj);
	},
	changePage: function(e){
		var pageIndex = e.currentTarget.getAttribute('data-page-index');
		this.setState({
			currentPage: pageIndex
		});
	},
	toggleColumnVisibility: function () {
		throw('Implement');
	},
	sort: function(a, b){
		var sortColumn = this.state.sortColumn,
			sortOrder = this.state.sortASC ? 1 : -1;

		return sortOrder * ((a[sortColumn] < b[sortColumn]) ? -1 : (a[sortColumn] > b[sortColumn]) ? 1 : 0);
	},
	render: function() {
		var self = this,
			firstItem = this.props.items[0],
			columns = this.props.columns || Object.getOwnPropertyNames(firstItem).map(function(prop){ return {name: prop}}),
			startIndex = (this.state.currentPage * this.state.pageSize),
			endIndex = startIndex + this.state.pageSize,
			rows = this.props.items,
			numPages = Math.ceil(rows.length / this.state.pageSize),
			numOptions = [];

		var headers = columns.map(function(column){
			return (<th style={{padding:0}}><a onClick={self.changeSort} data-sort-column={column.name} style={{padding:'8px', display:'block', width: '100%'}}>{column.displayName || column.name}</a></th>);
		});

		if(this.state.sortColumn)
			rows = rows.sort(this.sort);

		rows = rows.filter(function(item, index){
			return index >= startIndex && index < endIndex
		})
		.map(function(item){
			return (
				<tr key={item._id}>
					{
						columns.map(function(col) {
							return col.template && typeof(col.template) === 'function' ? <td>{col.template(item)}</td> : (<td>{item[col.name]}</td>);
						})
					}
				</tr>
			)
		});

		for(var i = 0; i < numPages; i++){
			numOptions.push(<li className={this.state.currentPage == i ? 'active' : ''}><a onClick={this.changePage} data-page-index={i}>{i + 1}</a></li>);
		}

		return (
			<table className={this.props.tableClassName}>
				<thead className={this.props.tHeadClassName}>
					<tr>
						{headers}
					</tr>
				</thead>

				<tbody className={this.props.tBodyClassName}>
					{rows}
				</tbody>

				<tfoot className={this.props.tFootClassName}>
					<tr>
						<td colSpan={headers.length} style={{textAlign: 'center'}}>
							<ul className='pagination' style={{marginTop:0}}>
								{numOptions}
							</ul>

							<label className="pull-right">
								<select className="form-control" onChange={this.changePageSize} value={this.state.pageSize}>
									<option value="10">10</option>
									<option value="25">25</option>
									<option value="50">50</option>
									<option value="100">100</option>
								</select>
							</label>
						</td>
					</tr>
				</tfoot>
			</table>
		);
	}
});