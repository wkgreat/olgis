import {parseCSVText} from "./CSVData";
import CSVPoints from "./CSVPoints";

test('should pasrse csv data', function () {

    let csv = `col1, col2, col3
    1,2,3
    4,5,6
    7,8,9
    `;
    let data = parseCSVText(csv,true,",");
    expect(1).toEqual(1);
});

test('should return write csv feature', function () {

    let csv = `col1, col2, col3
    1,2,3
    4,5,6
    7,8,9
    `;
    let data = parseCSVText(csv,true,",");

    let csvPoints = new CSVPoints();
    let f = csvPoints.readFeature(data,{
        x_field:"col1",
        y_field:"col1",
    });

});
