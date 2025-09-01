import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [startNum, setStartNum] = useState('');
  const [addNum, setAddNum] = useState('');
  const [result, setResult] = useState(null);

  const formatNumber = (n) => {
    if (n === null || n === undefined || Number.isNaN(n)) return '-';
    return Number.isInteger(n) ? String(n) : Number(n).toFixed(2);
  };

  const handleOperation = (op) => {
    const a = parseFloat(String(startNum).replace(',', '.'));
    const b = parseFloat(String(addNum).replace(',', '.'));
    if (isNaN(a) || isNaN(b)) {
      Alert.alert('Erro', 'Digite números válidos');
      return;
    }
    if (op === '/' && b === 0) {
      Alert.alert('Erro', 'Divisão por zero não permitida');
      return;
    }

    let res;
    switch (op) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/': res = a / b; break;
      default: return;
    }

    setResult({ a, b, op, res });
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      <View style={styles.container}>
        <Image source={require('./assets/calculadoraif.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.texto1}>Calculadora</Text>

        <Text style={styles.label}>Número inicial:</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Ex: 10"
          placeholderTextColor="#9bbf9b"
          value={startNum}
          onChangeText={(text) => setStartNum(text.replace(/,/g, '.'))}
        />

        <Text style={styles.label}>Segundo Número:</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Ex: 5"
          placeholderTextColor="#9bbf9b"
          value={addNum}
          onChangeText={(text) => setAddNum(text.replace(/,/g, '.'))}
        />

        <View style={styles.operationsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={() => handleOperation('+')}>
            <Text style={styles.optionText}>Somar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handleOperation('-')}>
            <Text style={styles.optionText}>Subtrair</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handleOperation('*')}>
            <Text style={styles.optionText}>Multiplicar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handleOperation('/')}>
            <Text style={styles.optionText}>Dividir</Text>
          </TouchableOpacity>
        </View>

        {result !== null && (
          <View style={styles.resultCard}>
            <Text style={styles.resultOperation}>{`${formatNumber(result.a)} ${result.op} ${formatNumber(result.b)}`}</Text>
            <Text style={[styles.resultValue, { color: result.res < 0 ? styles.negative.color : styles.positive.color }]}>
              {formatNumber(result.res)}
            </Text>
          </View>
        )}

        <StatusBar style="dark" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  positive: { color: '#2e7d32' },
  negative: { color: '#d32f2f' },

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  logo: {
    width: 140,
    height: 80,
    marginBottom: 10,
    alignSelf: 'center'
  },
  texto1: {
    color: '#2e7d32',
    fontSize: 26,
    marginBottom: 12,
    fontWeight: '700'
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginTop: 8,
    color: '#2e7d32'
  },
  input: {
    width: '80%',
    height: 44,
    borderColor: '#2e7d32',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 6,
    backgroundColor: '#ffffff',
    color: '#000000'
  },
  operationsContainer: {
    width: '90%',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  optionButton: {
    marginTop: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: '22%',
    alignItems: 'center'
  },
  optionText: {
    color: '#2e7d32',
    fontSize: 14,
    fontWeight: '700'
  },
  resultCard: {
    marginTop: 18,
    width: '85%',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#f1fbf1',
    borderWidth: 1,
    borderColor: '#2e7d32',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  resultOperation: {
    color: '#2e7d32',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600'
  },
  resultValue: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 1
    }
});