/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { MyAssetContract } = require('..');
const winston = require('winston');
let Person = require('../lib/Person.js');
//let Vaccination = require('../lib/Vaccination.js');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('MyAssetContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new MyAssetContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"my asset 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"my asset 1002 value"}'));
    });

    describe('#myAssetExists', () => {

        it('should return true for a my asset', async () => {
            await contract.myAssetExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a my asset that does not exist', async () => {
            await contract.myAssetExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createMyAsset', () => {

        it('should create a my asset', async () => {
            await contract.createMyAsset(ctx, '1003', 'my asset 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"my asset 1003 value"}'));
        });

        it('should throw an error for a my asset that already exists', async () => {
            await contract.createMyAsset(ctx, '1001', 'myvalue').should.be.rejectedWith(/The my asset 1001 already exists/);
        });

    });

    describe('#readMyAsset', () => {

        it('should return a my asset', async () => {
            await contract.readMyAsset(ctx, '1001').should.eventually.deep.equal({ value: 'my asset 1001 value' });
        });

        it('should throw an error for a my asset that does not exist', async () => {
            await contract.readMyAsset(ctx, '1003').should.be.rejectedWith(/The my asset 1003 does not exist/);
        });

    });

    describe('#updateMyAsset', () => {

        it('should update a my asset', async () => {
            await contract.updateMyAsset(ctx, '1001', 'my asset 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"my asset 1001 new value"}'));
        });

        it('should throw an error for a my asset that does not exist', async () => {
            await contract.updateMyAsset(ctx, '1003', 'my asset 1003 new value').should.be.rejectedWith(/The my asset 1003 does not exist/);
        });

    });

    describe('#Person', async () => {

        it('Person object should be created successfully, with all correct properties', async () => {
            let person = new Person('12345', 'Fixie', 'Hartmann', '01012001','patient','fixie@web.de', '015893655487');
            person.should.haveOwnProperty('personID');
            person.should.haveOwnProperty('firstName');
            person.should.haveOwnProperty('lastName');
            person.should.haveOwnProperty('dateOfBirth');
            person.should.haveOwnProperty('vaccinations');
            person.should.haveOwnProperty('type');
            person.should.haveOwnProperty('email');
            person.should.haveOwnProperty('phone');


        });

    });
    describe('#Vaccination', async () => {

        it('Vaccination object should be created successfully', async () => {
            let person = new Person('12345', 'Fixie', 'Hartmann', '01012001','patient','fixie@web.de', '015893655487');
            person.should.haveOwnProperty('personID');
            person.should.haveOwnProperty('firstName');
            person.should.haveOwnProperty('lastName');
            person.should.haveOwnProperty('dateOfBirth');
            person.should.haveOwnProperty('vaccinations');
            person.should.haveOwnProperty('type');
            person.should.haveOwnProperty('email');
            person.should.haveOwnProperty('phone');
            let newVaccination = await contract.createVaccination('Vaccine Astra Zeneca', '12345', '1111');
            console.log('in test newVaccination:');
            console.log(newVaccination);

            //newVaccination.should.haveOwnProperty('vaccineName');
            //newVaccination.should.haveOwnProperty('doctorID');
            //newVaccination.should.haveOwnProperty('batchID');
            console.log('1. Vaccinations Array before:');
            console.log(person.vaccinations);
            person.vaccinations.push(newVaccination);
            console.log('2. Vaccinations Array after:');
            console.log(person.vaccinations);
            console.log('3. #####################');

        });

    });

    describe('#deleteMyAsset', () => {

        it('should delete a my asset', async () => {
            await contract.deleteMyAsset(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a my asset that does not exist', async () => {
            await contract.deleteMyAsset(ctx, '1003').should.be.rejectedWith(/The my asset 1003 does not exist/);
        });

    });

});
